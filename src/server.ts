import express, { Express } from 'express'
import productsRouter from './router'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import db from './config/db'

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log( colors.red.bold('Unable to connect to the database'))
    }
}

connectDB()

// Instance of express
const server : Express = express()

// Conexion of cors
const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
server.use(cors(corsOptions))

// Read data of forms
server.use(express.json())

server.use(morgan('dev'))
// use content the http request. ej: get, post, put, patch, delete
server.use('/api/products', productsRouter)

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


export default server