import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  email: string;
  phone: number;
}

export interface IUserDoc extends IUser {
  checkPassword(password: string): boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: false },
});

userSchema.methods.checkPassword = function checkPassword(
  this: IUser,
  password: string,
): boolean {
  return password === this.password;
};

const User = model<IUserDoc>('User', userSchema);

export default User;
