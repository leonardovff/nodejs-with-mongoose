import mongoose, { Schema } from 'mongoose'
const crypto = require("crypto");

export interface Person {
    name: string
    email: string
    gender: string
    type: string
}
const counter = new Schema({
    _id: { type: String, unique: true, required: true },
    seq: { type: Number, required: true },
});
const counterModel = mongoose.model("counter", counter);

const schema = new Schema<Person>(
    {
        id: { type: Number, unique: true },
        name: { required: true, type: String },
        email: { required: true, type: String, unique: true },
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
schema.pre('save', function (next) {
    this.id = counterModel.findOneAndUpdate(
        { _id: "personSchema"},
        { $inc: { seq: 1} },
        { new: true, upsert: true},
        (error, result) => {
            if(error){
                return next(error);
            }
            this.id = result.seq;
            next();
        }
    )
})
export const PersonsModel = mongoose.model('Persons', schema)
