import mongoose from "mongoose";

const InvenotrySchema = new mongoose.Schema(
    {
        OrganisationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: [true, "OrganisationId is required"],
            trim: true
        },
        A_P: {
            type: Number,
            required: [true, "A+ Quantity is required"],
        },
        A_M: {
            type: Number,
            required: [true, "A- Quantity is required"],
        },
        B_P: {
            type: Number,
            required: [true, "B+ Quantity is required"],
        },
        B_M: {
            type: Number,
            required: [true, "B- Quantity is required"],
        },
        AB_P: {
            type: Number,
            required: [true, "AB+ Quantity is required"],
        },
        AB_M: {
            type: Number,
            required: [true, "AB- Quantity is required"],
        },
        O_P: {
            type: Number,
            required: [true, "O+ Quantity is required"],
        },
        O_M: {
            type: Number,
            required: [true, "O- Quantity is required"],
        }
    },
    {
        timestamps: true
    }
)


export{
    InvenotrySchema
}