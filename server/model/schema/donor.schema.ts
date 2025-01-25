import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
            trim: true,
            unique: true
        },
        phoneNo: {
            type: String,
            required: [true, "Phone no is required"],
            trim: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


export{
    DonorSchema
}