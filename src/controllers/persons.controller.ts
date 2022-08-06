import { JsonController, Get, Post, Body, Delete, Param } from 'routing-controllers'
import { Person } from '../models/persons.model'
import { PersonsService } from '../services/persons.service'

const personsService = new PersonsService()

@JsonController('/persons', { transformResponse: false })
export class PersonsController {
    @Get()
    async getAll() {
        const data = await personsService.getAll()
        return {
            status: 200,
            data,
        }
    }

    @Post('', { transformResponse: false })
    async create(@Body() p: Person) {
        await personsService.create(p)
        return {
            status: 201,
        }
    }

    @Delete('/:email', { transformResponse: false })
    async delete(@Param('email') email: string) {
        console.log(email);
        await personsService.deleteByEmail(email)
        return {
            status: 201,
        }
    }
}
