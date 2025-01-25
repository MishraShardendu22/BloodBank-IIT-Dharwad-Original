import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
    {
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donor",
            required: [true, "DonoId is required"],
            trim: true
        },
        quatity: {
            type: String,
            required: [true, "quantity is required"],
            trim: true
        }
    },
    {
        timestamps: true
    }
)


export{
    DonationSchema
}