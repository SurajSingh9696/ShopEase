const joi = require('joi');

const loginMiddleware = (req, res, next) => {
    try {
        const data = req.body;
        if (!data.email || !data.password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        else {
            const joiSchema = joi.object({
                email: joi.string().email().required(),
                password: joi.string().min(8).max(100).required()
            });
            const { error } = joiSchema.validate(data);
            if (!error) {
                next();
            } else {
                throw error;
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
}


const registerMiddleware = (req, res, next) => {
    try {
        const data = req.body;
        if (!data.name || !data.email || !data.password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        else {
            const joiSchema = joi.object({
                name: joi.string().min(3).max(30).required(),
                age: joi.number().min(1).max(120).optional().allow(''),
                email: joi.string().email().required(),
                password: joi.string().min(8).max(100).required(),
                phone: joi.string().optional().allow('')
            });
            const { error } = joiSchema.validate(data);
            if (!error) {
                next();
            } else {
                throw error;
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
}

module.exports = {
    login: loginMiddleware,
    register: registerMiddleware
}