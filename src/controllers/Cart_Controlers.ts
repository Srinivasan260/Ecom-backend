import { Request, Response } from "express"
import CartModel from "../models/CartModel"
import { redisClient } from "../config/redis"

export const AddCart = async (req: Request, res: Response) => {


    try {
        const Cart = await CartModel.create(req.body)
        res.status(200).json({ Message: "Carts created succesffully", Cart })

    }
    catch (err) {
        res.status(400).json({ err })
    }

}




export const AddManyCart = async (req: Request, res: Response) => {


    try {
        const Cart = await CartModel.insertMany(req.body)
        res.status(200).json({ Message: "Carts created succesffully", Cart })

    }
    catch (err) {
        res.status(400).json({ err })
    }

}









// ✅ Get Carts (with Redis caching)
export const GetCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cachedCarts = await redisClient.get('Carts');

        if (cachedCarts) {
            console.log('🟢 Cache Hit');
            res.status(200).json({ Carts: JSON.parse(cachedCarts) });
            return
        }

        // console.log('🔴 Cache Miss');
        const Carts = await CartModel.find().populate("products.productId");
        ;

        if (!Carts || Carts.length === 0) {
            res.status(404).json({ message: "No Carts found" });
            return
        }

        // Cache the Carts for 5 minutes
        await redisClient.setEx('Carts', 300, JSON.stringify(Carts));

        res.status(200).json({ Carts });
        return
    } catch (error) {
        console.error("Error fetching Carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};






// ✅ Delete Cart
export const delCart = async (req: Request, res: Response) => {
    await CartModel.findByIdAndDelete(req.params.id);
    await redisClient.del('Carts'); // Invalidate Cache
    res.json({ message: 'Cart deleted' });
}