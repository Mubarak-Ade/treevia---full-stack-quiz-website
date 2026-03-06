import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import UserStats from "../../models/UserStats.js";
import { createJWT } from "../../utils/jwt.js";
import type { Register } from "../../schema/auth.schema.js";

const register = async (userInfo: Register) => {
  const { name, email, password } = userInfo;

  if (!name || !email || !password) {
    throw createHttpError(400, "Missing fields");
  }

  let user = await User.findOne({ email });
  if (user) {
    throw createHttpError(400, "User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  user = new User({
    name,
    email,
    password: passwordHash,
  });

  await user.save();
  await UserStats.create({ user: user._id });

  const token = createJWT(user._id, user.role);

  return {
    user: {
      id: user._id,
      profile: user.profilePic,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const login = async (userInfo: Omit<Register, "name">) => {
  const { email, password } = userInfo;

  if (!email || !password) {
    throw createHttpError(400, "Missing fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(400, "User doesnt exists");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError(400, "Invalid credentials");
  }

  const token = createJWT(user._id, user.role);

  return {
    user: {
      id: user._id,
      profile: user.profilePic,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export default { register, login };
