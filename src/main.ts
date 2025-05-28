import express, {NextFunction, Request, Response} from 'express';
// import {Request, Response} from 'express';
import router from '../src/routes/productRoutes';
import { Router2 } from '../src/routes/categoriesRouter'; 
const app = express();

// app.get('/', (req:Request, res:Response)=>{
    //     res.send("hello world i am express");
    // })
    app.use(express.json());
    app.use("/categories", Router2);
    app.use('/products', router);
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

