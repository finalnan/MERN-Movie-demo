import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return responseHandler.badrequest(res, 'username already used');

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jwt.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    responseHandler.created(res, {
      token,
      displayName: user._doc.displayName,
      username: user._doc.username,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select('username password salt id displayName');

    if (!user) return responseHandler.badrequest(res, 'Invalid Credential');

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, 'Invalid Credential');

    const token = jwt.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    responseHandler.ok(res, {
      token,
      displayName: user._doc.displayName,
      username: user._doc.username,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select('password id salt');

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, 'Invalid Credential');

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch (error) {
    console.log(error);
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, {
      displayName: user._doc.displayName,
      username: user._doc.username,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signin,
  signup,
  updatePassword,
  getInfo,
};
