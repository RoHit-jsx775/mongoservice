// import mongoose from "mongoose";


// // It retrieves the MongoDB connection string from an environment variable and stores it in the url constant.
// const url= process.env.MONGO_URL;

// // It connects your application to a MongoDB Atlas cluster using Mongoose with the provided connection string.
// mongoose.connect("mongodb+srv://shushilBhusal:db_password@cluster0.di7hvuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// //  It creates a reference to the active MongoDB connection managed by Mongoose and stores it in the db constant.
// const db= mongoose.connection;


// //   It listens for MongoDB connection errors and logs them to the console if any occur
// db.on("error", (err)=>{
//     console.log("connection error:", err);
// })


// //it listens for the first successful MongoDB connection event and logs a confirmation message to the console.
// db.once("open", ()=>{
//     console.log("connected to MongoDB!");
// });

// export default mongoose;

import mongoose from "mongoose";

mongoose.connect(
"mongodb+srv://rohit:rohit@cluster0.3ubr15j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Connection Refused", err);
});

db.once("open", function () {
  console.log("Connected to MongoDB!");
});
export default mongoose;