
import { Request, Response, NextFunction } from "express";


const notFound = (req: Request, res: Response, next: NextFunction) => {

  res.status(404).send("Not Found");

};



export default notFound;
