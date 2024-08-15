const http = require('http');
const {validate} = require('./user');

const users = [];

const server = http.createServer((req,res) => {
    res.setHeader('Content-Type', 'application/json');
    const method = req.method;
    
    if (req.url === '/users' && method === 'POST') {    // Create
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            if (validate(newUser)) {
                const userID = users.length + 1;
                users.push({ id: userID, ...newUser });
                res.statusCode = 201;
                res.end(JSON.stringify({ message: `User created with id ${userID}`, user: newUser }));
            } else {
                const errors = validate.errors;
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "Failed to create user", errors }));
            }
        });
    } else if (req.url === '/users' && method === 'GET') { // Get All User
        res.end(JSON.stringify({
            users
        }))
    } else if (req.url.match(/\/users\/[^\/]+/) && method === 'GET') { // Get User with ID
        const id = req.url.split('/')[2];
        const user = users.find(u => u.id == id);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else if (req.url.match(/\/users\/[^\/]+/) && method === 'PUT'){   // Update User
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const id = req.url.split('/')[2];
            const updatedUser = JSON.parse(body);
            let index = users.findIndex(u => u.id == id);
            if (index !== -1 && validate(updatedUser)) {
                users[index] = { id, ...updatedUser };
                res.end(JSON.stringify({ message: 'User updated', user: users[index] }));
            } else if(!validate(updatedUser) ){
                const errors = validate.errors;
                res.statusCode = 400;
                res.end(JSON.stringify({ message: "Failed to create user", errors }));
            }
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    } else if (req.url.match(/\/users\/[^\/]+/) && method === 'DELETE'){    // Delete User
        const id = req.url.split('/')[2];
        const index = users.findIndex(u => u.id == id)
        if (index !== -1) {
            users.splice(index, 1);
            res.end(JSON.stringify({ message: `User with id ${id} deleted` }));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else {
        res.end(JSON.stringify({
            status: 404,
            message: "Route not found"
        }))
    }
})

const port = 8000;

server.listen(port, () => {console.log(`Server is running on port ${port}`);})