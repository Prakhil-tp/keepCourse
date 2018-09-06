import jwt from 'jsonwebtoken';
import { validateUser, validateSignupUser } from '../../util/inputValidation';
import { getUserByEmail, User, createUser } from '../../models/user';


// user login
const login = (req, res) => {
  const { error } = validateUser(req.body);
  if( error )
    return res.status(400).json({ message: error.details[0].message });
  const user = { email: req.body.email, password: req.body.password}
  const token = jwt.sign({ user }, 'my_secret_key')
  res.json({ token });
}

// user signup
const signup = (req, res) => {
  const { error } = validateSignupUser(req.body);
  if(error)
    return res.status(400).json({ message: error.details[0].message })
    
  getUserByEmail(req.body.email, (err, user) => {
    if(err) throw err;
    else if(user) return res.json({ message: 'already have an account in this email'})
  });
  
  const newUser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    password: req.body.password
  });
  createUser(newUser, (err,result) => { 
    if(err) console.log({'message': err});
    else
      res.json({message: 'user created succesfully'});
  });

}

export { login, signup };