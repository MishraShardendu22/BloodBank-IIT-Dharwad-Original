import { Schema } from 'mongoose';

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name']
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
        }
    },
    {
        timestamps: true,
    }
)

export {
    AdminSchema
}