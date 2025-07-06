import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModels } from "../models/Usermodel";
import { NextFunction, Request, Response } from "express";



export const Userregister = async (req: Request, res: Response): Promise<void> => {

  const { name, emailid, password, phonenumber, age, gender, Address } = req.body;

  if (!name || !emailid || !password || !phonenumber) {
    res.status(404).json({ Message: "All fields required " })
    return
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModels({ name, emailid, password: hashedPassword, phonenumber, age });

  try {
    const response = await newUser.save();

    res.status(201).json({ Message: "User registered successfully" });
  }
  catch (error) {
    res.status(400).json({ error });
  }

}


// Login User
export const UserLogin = async (req: Request, res: Response): Promise<void> => {

  const { email, password } = req.body;



  const user = await UserModels.findOne({ emailid: email });




  if (!user || !(await bcrypt.compare(password, user.password))) {

    res.status(401).json({ Message: "Invalid credentials" });

    return

  }


  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

  res.status(200).json({ Message: "User Login successfully", token });

}




interface CustomRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token missing or invalid' });
    return;                                // <-- now returns void
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;                    // decoded can be typed more strictly
    next();                               // OK – continues request flow
  } catch {
    res.status(403).json({ message: 'Unauthorized' });
    // no explicit return needed – still void
  }
};