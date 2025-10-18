import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB Connected Successfully!")
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR: ", error);
    }
}

export default connectDB;
