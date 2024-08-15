const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = new Ajv()
addFormats(ajv)

const userSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },  // Optional, can be generated later
        name: { type: "string" },
        email: { type: "string", format: "email" },
        dateofbirth: { type: "string", format: "date" }
    },
    required: ["name", "email", "dateofbirth"],
    additionalProperties: false
}

const validate = ajv.compile(userSchema)
module.exports = {
    userSchema,
    validate
}