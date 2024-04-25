
import jwt from 'jsonwebtoken';
import {User}from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization.split(" ")[1]

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user based on the decoded token
    const user = await User.findById({ _id: decoded.userID, 'tokens.token': token });

    // If no user is found, throw an error
    if (!user) {
      throw new Error();
    }


    req.token = token;
    req.user = user;
    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default authMiddleware;