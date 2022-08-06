import mongoose, { Schema } from 'mongoose'
import { Person } from './persons.model'

export interface Flight {
    code: string;
    origin: string;
    destination: string;
    status: string;
    passengers: Person[];
}

const schema = new Schema<Flight>(
    {
        code: { required: true, type: String },
        origin: { required: true, type: String },
        destination: { required: true, type: String },
        status: String,
        passengers: [{type: mongoose.Types.ObjectId, ref: "Persons" }],
    },
    { timestamps: true }
)

export const FlightsModel = mongoose.model('Flights', schema)
