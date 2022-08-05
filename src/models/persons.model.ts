import mongoose, { Schema } from 'mongoose'

export interface Person {
    name: string
    email: string
    gender: string
    type: string
}

const schema = new Schema<Person>(
    {
        name: { required: true, type: String },
        email: { required: true, type: String },
        gender: {
            required: true,
            type: String,
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} gender is not supported',
            },
        },
        type: { type: String },
    },
    { timestamps: true }
)

export const PersonsModel = mongoose.model('Persons', schema)
