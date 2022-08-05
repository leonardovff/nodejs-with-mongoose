import { Person, PersonsModel } from '../models/persons.model'

export class PersonsService {
    async getAll() {
        return await PersonsModel.find()
    }
    async getAllByEmail(emails: string[]) {
        return await PersonsModel.find({email: {$in: emails}}).exec();
    }

    async create(person: any) {
        await PersonsModel.create(person)
    }
}
