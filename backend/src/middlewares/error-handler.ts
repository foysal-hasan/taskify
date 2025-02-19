// import { Request, Response, NextFunction } from 'express';
// import { StatusCodes } from 'http-status-codes';

// interface CustomError {
//   statusCode: number;
//   msg: string;
// }

// const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
//   let customError: CustomError = {
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong try again later',
//   };

//   console.log(err);

//   if (err.name === 'ValidationError') {
//     customError.msg = Object.values(err.errors)
//       .map((item: any) => item.message)
//       .join(',');
//     customError.statusCode = 400;
//   }
//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
//     customError.statusCode = 400;
//   }
//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`;
//     customError.statusCode = 404;
//   }

//   return res.status(customError.statusCode).json({ msg: customError.msg });
// };

// export default errorHandlerMiddleware;

import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: err.message });
};

export default errorHandler;