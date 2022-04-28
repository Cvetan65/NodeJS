const Joi = require("joi");

//validation schema
const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(), //заради Кинезите min(2). Е ајде де...
  lastName: Joi.string().min(2).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required()
});

const userValidator = (req, res, next) => {
  const userData = req.body;

  //user data validating
  const validation = userSchema.validate(userData);

  //checking validation error
  if (validation?.error) {
    res.status(400).send({ msg: validation.error.details[0].message});
  } else {
      next()
  }
};

module.exports = userValidator;
