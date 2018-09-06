import joi from 'joi';

// validation of course
const validateCourse = course => {
  const schema = { name: joi.string().min(3).required() }
  return joi.validate(course, schema);
}

// validation of login content
const validateUser = user => {
  const schema = { 
    email: joi.string().email().required(),
    password: joi.string().min(6).required().regex(/^[a-zA-Z0-9]/)
  }
  return joi.validate(user, schema);
}

// signup content validation
const validateSignupUser = user => {
  const schema = {
    firstname : joi.string().min(3).required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).required().regex(/^[a-zA-Z0-9]/)
  }
  return joi.validate(user, schema);
}

export { validateCourse, validateUser, validateSignupUser };