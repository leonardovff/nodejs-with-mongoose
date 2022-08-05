import { JsonController, Get, Post, Body } from 'routing-controllers';
import { FlightsService } from '../services/flights.service';
import { PersonsService } from '../services/persons.service';

const flightsService = new FlightsService()
const personsService = new PersonsService()

@JsonController('/flights')
export default class FlightsController {
    @Get('', { transformResponse: false })
    async getAll() {
        return {
            status: 200,
            data: await flightsService.getAll(),
        }
    }
    @Post('', { transformResponse: false })
    async createFlightAndAssociatePersons(@Body() body: any) {
        const {code, origin, destination, peopleEmail} = body;
        const flight = {
            code, 
            origin, 
            destination
        };
        const people = await personsService.getAllByEmail(peopleEmail);
        await flightsService.createFlightAndAssociatePersons(flight, people);
        return {
            status: 200,
            data: await flightsService.getAll(),
        }
    }
}
