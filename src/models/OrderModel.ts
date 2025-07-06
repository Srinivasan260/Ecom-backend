import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  status: string;
}


const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending","Confirmed", "Shipped", "Delivered"], default: "Pending" },
 });

export default mongoose.model<IOrder>("Order", OrderSchema);
