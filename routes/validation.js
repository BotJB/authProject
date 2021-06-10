const Joi=require('@hapi/joi')

const validation=(data) => {
    const schema=Joi.object({
        user:Joi.string().min(6).required(),
        email:Joi.string().required().min(6).email(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(data);
}
const loginValidation=(data) => {
    const schema=Joi.object({
        email:Joi.string().required().min(6).email(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(data);
}

module.exports.validation=validation
module.exports.loginValidation=loginValidation