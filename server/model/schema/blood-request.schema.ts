import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "PatientId is required"],
            trim: true
        },
        quantity: {
            type: String,
            required: [true, "quantity is required"],
            trim: true
        },
        type: {
            type: String,
            required: [true, "Blood type is required"],
            trim: true,
            enum: {
                values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
                message: "{VALUE} is not a valid blood type"
            }
        },
        completed: {
            type: Boolean,
            required: [true, "completed is required"],
            default: false
        }
    },
    {
        timestamps: true
    }
)


export{
    BloodRequestSchema
}