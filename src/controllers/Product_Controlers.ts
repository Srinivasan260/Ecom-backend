import { Request, Response } from "express"
import ProductModel from "../models/ProductModel"
import { redisClient } from "../config/redis"

export const AddProd = async (req: Request, res: Response) => {


    try {
      
        const product = await ProductModel.create(req.body)
        res.status(200).json({ Message: "Products created succesffully", product })

    } catch (err) {
        res.status(400).json({ err })
    }

}



// ✅ Get Products (with Redis caching)
export const GetProd = async (req: Request, res: Response): Promise<void> => {
    try {
        const cachedProducts = await redisClient.get('products');

        if (cachedProducts) {
            console.log('🟢 Cache Hit');
            res.status(200).json({ Products: JSON.parse(cachedProducts) });
            return
        }

        // console.log('🔴 Cache Miss');
        const products = await ProductModel.find();

        if (!products || products.length === 0) {
            res.status(404).json({ message: "No products found" });
            return
        }

        // Cache the products for 5 minutes
        await redisClient.setEx('products', 300, JSON.stringify(products));

        res.status(200).json({ products });
        return
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getkeys = async (req: Request, res: Response): Promise<void> => {

    const keys = await redisClient.keys("*");
    

    for (const key of keys) {
        const value = await redisClient.get(key);
        console.log(`${key}: ${value}`);
    }

}

export const updateProd = async (req: Request, res: Response) => {


    try {

        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await redisClient.del('products'); // Invalidate Cache
        res.json(product);

    } catch (err) {
        console.log(err)
    }

}

// ✅ Delete Product
export const delProd = async (req: Request, res: Response) => {

    await ProductModel.findByIdAndDelete(req.params.id);
    await redisClient.del('products'); // Invalidate Cache
    res.json({ message: 'Product deleted' });
}