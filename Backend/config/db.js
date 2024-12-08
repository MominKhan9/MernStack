import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://mominnadeem66:4975155@cluster0.vicfn.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}