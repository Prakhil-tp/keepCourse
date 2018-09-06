import jwt from 'jsonwebtoken';

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if(!err){
        next();
      }
      else res.status(403).json({ message:'invalid token' });
    })
    
  }
  else res.status(403).json({ message:'token must be provided' });
}
export { ensureToken };