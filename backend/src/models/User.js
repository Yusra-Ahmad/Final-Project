
import mongoose from "mongoose";
const { model, Schema } = mongoose;
import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;

const required = true;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required },
    password: { type: String, required },
  },
  { versionKey: false }
);

userSchema.statics.register = async (data) => {
  const hashed = await hash(data.password, 10);

  data.password = hashed;
  return User.create(data);
};

userSchema.statics.login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return false;
  }

  //// check if password matches

  const match = await compare(data.password, user.password);
  if (!match) {
    return false;
  }

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model("User", userSchema);

