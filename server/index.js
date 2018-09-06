import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { db } from './config/database';
import { apiRouter } from './routes';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
mongoose.set('useCreateIndex', true);

// Database connection setup
mongoose.connect(db, { useNewUrlParser: true}, err => {
  if(err) console.error(`database connection problem - ensure MongoDB is turned on or not ! : ${err}`);
  else console.log(`connected to database. uri: ${db}`);
});

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

global.courses = [
  {id:1,name:'course1'},
  {id:2,name:'course2'},
  {id:3,name:'course3'}
];

// Routings
app.get('/', (req,res) => { res.send('home page'); });
app.use('/api', apiRouter);



const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));
