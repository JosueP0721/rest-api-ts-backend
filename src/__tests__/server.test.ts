import { connectDB } from '../server'
import db from '../config/db'

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Connection failed'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to connect to the database'))
    })
})