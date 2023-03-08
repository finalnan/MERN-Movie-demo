import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import userModel from '../models/user.model.js';

const jwtDecode = (req) => {
  try {
    const bearerHeader = req.header('authorization');

    if (!bearerHeader) return false;

    return jwt.verify(bearerHeader, process.env.JWT_SECRET);
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const jwtDecoded = jwtDecode(req);

  if (!jwtDecoded) return responseHandler.unauthorize(res);

  const user = await userModel.findById(jwtDecoded.data);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, jwtDecode };
