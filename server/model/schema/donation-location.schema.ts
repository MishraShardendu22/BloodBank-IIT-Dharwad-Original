import mongoose from "mongoose";

const DonationLocationSchema = new mongoose.Schema(
    {
        organisationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Oranisation",
            required: [true, "organisationId is required"],
            trim: true
        },
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true
        },
        contactDetails: {
            type: String,
            required: [true, "contact details is required"],
            trim: true
        },
        location: {
            type: String,
            required: [true, "location is required"],
            trim: true
        },
        timings: {
            type: String,
            required: [true, "timings is required"],
            trim: true
        },
        otherDetails: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
    }
)


export{
    DonationLocationSchema
}