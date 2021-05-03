const Joi = require('@hapi/joi');

//register validation
const registervalidation = data =>{
    const schema = {
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()

    };

    return Joi.validate(data, schema);
    

}

const loginvalidation = data =>{
    const schema = {
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()

    };

    return Joi.validate(data, schema);
}

module.exports.loginvalidation = loginvalidation;
module.exports.registervalidation = registervalidation;
