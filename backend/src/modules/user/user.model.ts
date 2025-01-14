import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export enum Role {
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
  password: { type: String, required: true },
  phoneNumber: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  dateOfBirth: String,
  dateOfJoining: String,
  profilePicture:String,
  status: String,
}, {
  timestamps: true,
});

userSchema.methods.matchPassword = async function (password:string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = model<IUser>('User', userSchema);

export default User;