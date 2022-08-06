import { JsonController, Get, Post, Body, Param, Patch } from 'routing-controllers';
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
    @Patch('/:code/booking', { transformResponse: false })
    async bookingFlightToOnePerson(
        @Param('code') code: string,
        @Body() body: ({ peopleEmail: string[]}),
    ) {
        const people = await personsService.getAllByEmail(body.peopleEmail);
        return await flightsService.associatePeopleToFlight(
            code, 
            people
        );
    }
}
