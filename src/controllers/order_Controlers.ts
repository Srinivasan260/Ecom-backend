import OrderModel from "../models/OrderModel";
import { placeOrder } from "../kafka/Producer";
import { Request, Response } from "express"

export const saveOrder = async (order: any) => {
  try {
    order.status = "Confirmed";

    const newOrder = new OrderModel(order);
    await newOrder.save();

  } catch (error) {
    console.error("❌ Error saving order:", error);
  }
};

export const OrderProcess = async (req: Request, res: Response) => {
  try {
    const { userId, products, totalAmount } = req.body



    await placeOrder(userId, products, totalAmount)
    res.status(200).send({ status: "success", message: "Order placed!" })

  } catch (err) {

    res.status(404).send({ status: "error", message: "Order is not placed" })
  }


}