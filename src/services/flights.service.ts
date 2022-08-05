import { Flight, FlightsModel } from '../models/flights.model'
import { FlightPersonModel } from '../models/flightsPersons';
import { Person } from '../models/persons.model';

export class FlightsService {
    getAll() {
        return FlightsModel.find({}).exec();
    }

    async createFlightAndAssociatePersons(flight: Flight, persons: Person[]) {
        const flightRecord = await FlightsModel.create(flight);
        await Promise.all(persons.map(async person => {
            await FlightPersonModel.create({
                flight: flightRecord,
                person,
            });
        }))
    }
}
