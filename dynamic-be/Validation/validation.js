const joi = require('@hapi/joi')

const validation = joi.object({
    name: joi.string()
             .min(3)
             .max(20)
             .pattern(new RegExp('^[a-zA-Z ]+$'))
             .required(),
    email: joi.string()
              .pattern(new RegExp('^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$'))
              .required(),
    contact: joi.string()
                .pattern(new RegExp('^[6-9]{1}[0-9]{9}$'))
                .required(),
    gender: joi.string()
               .pattern(new RegExp('^(Male)$|^(Female)$|^(Others)$'))
               .required(),
    address: joi.string().allow(''),
    employment: joi.string()
                   .pattern(new RegExp('^(Full-Time)$|^(Part-Time)$'))
                   .required(),
    driving_license: joi.boolean().allow(''),
    identity: joi.string().when('driving_license',{ is: 'true', then: joi.string().pattern(new RegExp('^[0-9]{9}$')).required(), otherwise: joi.allow('') }),
    license_expiry: joi.date().when('driving_license',{ is: 'true', then: joi.date().min(new Date(Date.now())).required(), otherwise: joi.allow('') }),
    agreement: joi.boolean().required()
})

module.exports = { validation }