import { Schema } from 'mongoose';

const PatientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name']
        },
        phoneNo: {
            type: String,
            required: [true, 'Please provide a phone number']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        }
    },
    {
        timestamps: true,
    }
)

export {
    PatientSchema
}