import { Schema } from 'mongoose';

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
        phoneNo: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

export {
    AdminSchema
}