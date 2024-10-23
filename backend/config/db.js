import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://greatstack:9890647278@cluster0.kigxm.mongodb.net/Farm2Fresh?retryWrites=true&w=majority');
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};
