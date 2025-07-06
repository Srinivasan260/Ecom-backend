import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name:string,
    password : string,
    age:number,
    phonenumber:number,
    emailid :string,
    

}

const UserSchema:Schema = new Schema({
    name :{
        type :String,
        required :true,
    },
    age :{
        type:Number,
        required :true

    },
    password : {
        type:String,
        required :true
    },
    phonenumber: {
        type:Number,
        required : true

    },
    emailid :{
        type:String,
        required : true
    }
 


})

export const UserModels = mongoose.model<IUser>("User", UserSchema);
