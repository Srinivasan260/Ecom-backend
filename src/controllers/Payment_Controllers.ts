import PaymentModel from "../models/Payment.Model";
import { Request, Response } from "express";
import Stripe from "stripe";


import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-02-24.acacia" });

export const createPayment = async (req: Request, res: Response) => {

  try {

    const { amount, currency } = req.body

    const paymentIntentId = await stripe.paymentIntents.create({
      amount, currency, payment_method_types: ["card"],
    })



    const payment = new PaymentModel({
      amount, currency, paymentIntentId: paymentIntentId.id, status: "pending",
    })

    await payment.save();


    res.status(200).send({ clientSecret: paymentIntentId.client_secret });

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Payment processing failed" });

  }

}


export const cancelPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.params;
    const canceledIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    res.json({ message: "Payment intent canceled", data: canceledIntent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel payment intent" });
  }
};


export const confirmPayment = async (req: Request, res: Response) => {

  const sig = req.headers["stripe-signature"]
  try {

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_SECRET_KEY!
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;



      await PaymentModel.findOneAndUpdate({ paymentIntentId: paymentIntent.id }, { status: "succeeded" });
    }

    res.json({ received: true });


  } catch (err) {


    res.status(400).send(`Webhook error: ${err}`);

  }

}