import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {

  userId: string;
  products: { productId: string; quantity: number }[];

}

const CartSchema: Schema = new Schema({

  userId :{
    type:Schema.Types.ObjectId ,ref :'User',required:true
  },
  
  products :[
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
    }
  ]

});

export default mongoose.model<ICart>("Cart", CartSchema);
