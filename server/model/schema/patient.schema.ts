import { Schema } from 'mongoose';

const PatientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true
        },
        phoneNo: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

export {
    PatientSchema
}