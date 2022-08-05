import 'reflect-metadata'
require('dotenv').config()

import { createExpressServer } from 'routing-controllers'
import { db } from './memory-database'
const port = process.env.PORT

const app = createExpressServer({
    routePrefix: '/v1',
    controllers: [`${__dirname}/controllers/*.controller.*`],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
})

// Connect to In-Memory DB
const bootStartApplication = async () => {
    await db({ test: false })
    app.listen(port, () => {
        console.log(`[Live Coding Challenge] Running at http://localhost:${port}`)
    })
}
bootStartApplication().then();


export default app
