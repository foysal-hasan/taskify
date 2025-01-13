import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

enum Role {
  Admin = 'admin',
  Member = 'member',
  Gerente = 'gerente',
  Developer = 'developer',
  ProjectManager = 'project manager',
  Gone = 'gone',
  TeamLeader = 'team leader',
  Client = 'client'
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  dateOfBirth: Date;
  dateOfJoining: Date;
  password: string;
  profilePicture: string;
  status: string;
  matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfJoining: { type: Date, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
  status: { type: String, required: true },
});

// Pre-save hook to hash the password
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Method to check the password
userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;