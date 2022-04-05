const { use } = require('express/lib/application');
const Joi = require('joi');

const user = Joi.object({
    id: Joi.any(),
    name: Joi.string().pattern(new RegExp('^[a-z A-Z]{4,30}$')).required().messages({'string.pattern.base': 'Name must only contain letter. Minimum 4 and maximum 30 characters!'}),
    email: Joi.string().email({ allowUnicode: false }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).messages({'string.pattern.base': 'Password must contains combination of lower case, upper case and numbers. Minmum 8 and Maximum 30 charecters long!'}).required(),
    repeat_password: Joi.ref('password')
}).with('password', 'repeat_password');


module.exports = user;