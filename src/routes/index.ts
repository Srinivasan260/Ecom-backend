import express from "express";
import { GetUsers, UpdateUser, DeleteUser } from "../controllers/User_Controlers";
import { authenticateJWT, UserLogin, Userregister } from "../controllers/auth_Controlers";
import { AddProd, delProd, getkeys, GetProd, updateProd } from "../controllers/Product_Controlers";
import { OrderProcess } from "../controllers/order_Controlers";
import { processOrders } from "../kafka/Consumer";
import { createPayment,cancelPaymentIntent } from "../controllers/Payment_Controllers";


import { AddCart, AddManyCart, delCart, GetCart } from "../controllers/Cart_Controlers";
// import { createPayment,cancelPaymentIntent} from "../controllers/Payment_Controllers";


const router = express.Router();

router.post('/auth', UserLogin);

// Routes
router.post("/addUsers",authenticateJWT, Userregister);       // Create User
router.get("/getUsers",authenticateJWT, GetUsers);       // Get All Users
router.put("/update/:id",authenticateJWT, UpdateUser); // Update User
router.delete("/delete/:id",authenticateJWT, DeleteUser); // Delete User



// Routes 
router.post("/addproduct",authenticateJWT, AddProd)
router.get("/getallprod",authenticateJWT, GetProd)
router.get("/viewkeys",authenticateJWT, getkeys)
router.put('/updateProduct/:id', authenticateJWT,updateProd)
router.delete('/deleteproduct/:id',authenticateJWT, delProd)

// OrderRoutes
router.post('/addOrder',authenticateJWT,OrderProcess)
// processOrders().catch(console.error);

router.post('/createPayment',authenticateJWT,createPayment)
router.delete('/deletPay/:paymentIntentId',authenticateJWT,cancelPaymentIntent)


// cart 
router.post('/addcart',authenticateJWT, AddCart);
router.get('/getCart', authenticateJWT,GetCart)
router.post('/AddBulkCart',authenticateJWT, AddManyCart);
router.delete('/delCart/:id',authenticateJWT,delCart)






// Routes
router.post('/register',authenticateJWT, Userregister)
router.post('/login',authenticateJWT, UserLogin)





export default router;