import { Request,Response } from "express"
import { UserModels,IUser } from "../models/Usermodel"






// ✅ GET all users
export const GetUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserModels.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // ✅ UPDATE User
  export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if(!id){
        res.status(400).json({message:"Id is needed "})
      }
 
      const updatedUser = await UserModels.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // ✅ DELETE User
  export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
          
      if(!id){
        res.status(400).json({message:"Id is needed "})
      }
 


      const deletedUser = await UserModels.findByIdAndDelete(id);
  
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      res.status(200).json({ message: "User deleted" });
      
    } catch (error) {
      res.status(500).json({ message: "Server error", error });

    }
  };