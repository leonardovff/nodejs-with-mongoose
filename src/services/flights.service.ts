import { FlightsModel } from '../models/flights.model';
import { Person } from '../models/persons.model';

export class FlightsService {
    getAll() {
        return FlightsModel
            .find({})
            .populate(['passengers'])
            .exec();
    }

    async associatePeopleToFlight(code: string, passengers: Person[]) {
        const flightRecord = await FlightsModel.findOneAndUpdate({
            code,
        }, { 
            passengers
        },{
            new: true
        })
        .populate(["passengers"])
        .exec();

        return flightRecord;
    }
}
