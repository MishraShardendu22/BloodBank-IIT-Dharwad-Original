import { Schema } from 'mongoose';

const OrganisationSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide a name'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
        email:{
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            trim: true
        },
        phoneNo:{
            type: String,
            trim: true
        },
    },
    {
        timestamps: true,
    }
)

export {
    OrganisationSchema
}