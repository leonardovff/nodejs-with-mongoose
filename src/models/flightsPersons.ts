import mongoose, { Schema } from 'mongoose'
import { Flight } from './flights.model';
import { Person } from './persons.model';

interface FlightsPerson {
    flight: Flight;
    person: Person;
}

const FlightPersonSchema = new Schema<FlightsPerson>({
    flight: {type: mongoose.Types.ObjectId, ref: "Flight"},
    person: {type: mongoose.Types.ObjectId, ref: "Person"}
},
{ timestamps: true });

export const FlightPersonModel = mongoose.model("FlightPerson", FlightPersonSchema);