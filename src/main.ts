import express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
// import {Request, Response} from 'express';
// import router from '../src/routes/productRoutes';
import {productRouter} from './routes/productRoutes'
import { Router2 } from '../src/routes/categoriesRouter'; 
import {userRouter} from '../src/routes/userRouter';
import { orderRouter } from './routes/ordersRouter';
const app = express();
dotenv.config();

// app.get('/', (req:Request, res:Response)=>{
    //     res.send("hello world i am express");
    // })
    app.use(express.json()); // convert request body to json in beginning which is in string format   
    app.use("/categories", Router2);
    app.use('/products', productRouter);
    app.use('/users', userRouter);
    app.use('/orders', orderRouter);
  
    app.use((error:any, req:Request, res:Response, next:NextFunction)=>{
        console.log("error received", error);
        if(error.status===404 || error.status===403 || error.status===400){
            res.status(error.status).json(error.message)
        }
        else res.status(500).json({
    message:"internal server error"
})
})

const PORT= 3000;  
app.listen(PORT, ()=>{
    console.log(`server listening on port: ${PORT}`)
})

export default app;

