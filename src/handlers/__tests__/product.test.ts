import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Mouse - testing',
                price: 0,
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is a number and greater that 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Mouse - testing',
                price: 'abc',
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(1)
    })

    it('should create a new product', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Mouse - testing - 2',
                price: 150,
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    }, 15000)
})

describe('GET /api/products', () => {
    it('should check if api/products url exists', async () => {
        const response = await request(server)
            .get('/api/products')

        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with all products', async () => {
        const response = await request(server)
            .get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    it('should return a 404 response for a non-existing product', async () => {
        const productId = 1000
        const response = await request(server)
            .get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBe('Product not found')
    })

    it('should check a valid ID in the url', async () => {
        const response = await request(server)
            .get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')  
        expect(response.body.errors[0].msg).toBe('Id not valid')
        expect(response.body.errors).toHaveLength(1)
    })

    it('get a JSON response with a single product', async () => {
        const response = await request(server)
            .get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data') 
    })
})

describe('PUT /api/products/:id', () => {
    it('should check a valid ID in the URL', async () => {
        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: 'Mouse - testing',
                availability: true,
                price: 150
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Id not valid')

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should display validation error messages when updating a product', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: 'Mouse - testing',
                availability: true,
                price: 0
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors[0].msg).toBe('Price must be greater than 0')

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(2)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should 404 when updating a non-existing product', async () => {
        const productId = 1000
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: 'Mouse - testing',
                availability: true,
                price: 150
            })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBe('Product not found')

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should update an existing product with valid data', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: 'Mouse - testing',
                availability: true,
                price: 150
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existing product', async () => {
        const productId = 1000
        const response = await request(server)
            .patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBe('Product not found')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update the product availability', async () => {
        const response = await request(server)
            .patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID in the URL', async () => {
        const response = await request(server)
            .delete('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Id not valid')

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should return a 404 response for a non-existing product', async () => {
        const productId = 1000
        const response = await request(server)
            .delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBe('Product not found')

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should delete a product', async () => {
        const response = await request(server)
            .delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Product deleted successfully')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})