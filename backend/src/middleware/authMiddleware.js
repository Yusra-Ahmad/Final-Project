// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded token
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    // If no user is found, throw an error
    if (!user) {
      throw new Error();
    }

    // Attach the token and user to the request object for further use
    req.token = token;
    req.user = user;
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default authMiddleware;