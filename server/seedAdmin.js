import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from 'dotenv'
dotenv.config()

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
        console.log("Admin already exists");
        return process.exit();
    }
    const hashPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
        username: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
    });

    await admin.save();
    console.log("Admin user created");
    process.exit();
};

createAdmin();
