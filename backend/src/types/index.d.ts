import { IUser } from '../modules/user/user.model';

declare namespace Express {
  export interface Request {
    user?: { id: string;  email: string };
    rawBody: any;
  }
}

// {
//   id: user._id,
//   userId: user._id,
//   email: user.email,
// }