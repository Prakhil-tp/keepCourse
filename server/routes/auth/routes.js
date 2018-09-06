import jwt from 'jsonwebtoken';
import { validateUser, validateSignupUser } from '../../util/inputValidation';
import { getUserByEmail, User, createUser, comparePassword } from '../../models/user';
import * as config from '../../config/database';



// user login
const login = (req, res) => {
  const { error } = validateUser(req.body);
  console.log(req.body);
  if( error )
    return res.status(400).json({ message: error.details[0].message });

  //  invokes by the 'getUserByEmail' method
  const passwordChecking = user => {
    // response handling of 'comparePassword'
    const isPasswordMatch = (err, isMatch) => {
      if(!err && isMatch){
        const token = jwt.sign({ user }, config.secret, { expiresIn: config.tokenExpiry });
        res.status(200).json({ success:true , token });
      }
      else if(!isMatch) res.status(201).json({ success:false, message: 'incorrect password' });
      else if(err) console.log(`error at login - password comparison: ${err}`);
    }
    comparePassword(req.body.password, user.password, isPasswordMatch );

  }

  getUserByEmail(req.body.email, (err, user) => {
    if(err) console.log(`error getting user at login: ${err}`);
    else if(!user) res.status(201).json({ success: false, message: 'invalid login credentials' });
    else if(user) passwordChecking(user);
  });
  
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