import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/database';

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  firstname:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

// retun user from the db by UserId
const getUserById = (id, next) => {
  User.findById(id, next);
}

// return user from the db by email
const getUserByEmail = (email, next) => {
  User.findOne({ email }, next);
}

// creating new user to the db
const createUser = (newUser, next) => {

  // runs after the 'hashGen' ( hash generation)
  const saveUser = (err, hashedPassword) => {
    newUser.password = hashedPassword;
    newUser.save(next);
  };

  // runs after genSalt ( salt generation )
  const hashGen = (err, salt) => {
    if(!err) bcrypt.hash(newUser.password, salt, saveUser);
    else console.log(err);
  };

  bcrypt.genSalt(10, hashGen);
}

// password comparison
const comparePassword = (inputPassword, hashedPassword, next) => {
  bcrypt.compare(inputPassword, hashedPassword, next);
}

export { User, getUserById, getUserByEmail, createUser, comparePassword };