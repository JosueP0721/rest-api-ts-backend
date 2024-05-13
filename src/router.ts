import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct, deleteProduct } from './handlers/product'
import { handleInputErrors } from "./middleware"

const router: Router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: "Monitor Curvo"
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 200
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product' 
 */
// Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *             - Products
 *          description: Return a product by ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The product ID
 *              required: true
 *              shema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      apllication/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - Invalid ID
 */
router.get('/:id', 

    // Validation
    param('id')
        .isInt().withMessage('Id not valid'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              explame: "Monitor Curvo"
 *                          price:
 *                              type: number
 *                              example: 200
 *      responses:
 *          201:
 *              description: Product successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input
 */
router.post('/', 

    // Validation
    body('name')
        .notEmpty().withMessage('Name is required'),

    body('price')
        .isNumeric().withMessage('Price must be a number')
        .notEmpty().withMessage('Price is required')
        .custom(value => value > 0).withMessage('Price must be greater than 0'),

    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product by ID
 *      tags:
 *          - Products
 *      description: Update a product by ID
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The product ID   
 *              required: true
 *              shema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              explame: "Monitor Curvo"
 *                          price:
 *                              type: number
 *                              example: 200
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input
 *          404:
 *              description: Product not found
 */
router.put('/:id', 

    // Validation
    param('id')
        .isInt().withMessage('Id not valid'),
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .notEmpty().withMessage('Price is required')
        .custom(value => value > 0).withMessage('Price must be greater than 0'),
    body('availability')
        .isBoolean().withMessage('Availability not valid'),

    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update availability of a product by ID
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The product ID
 *              required: true
 *              schema: 
 *                  type: integer
 *      responses:
 *          200:
 *              description: Product availability updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input
 *          404:
 *              description: Product not found
 */
router.patch('/:id', 
    // Validation    
    param('id')
        .isInt().withMessage('Id not valid'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by ID
 *      tags:
 *          - Products
 *      description: Delete a product by ID
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The product ID
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *             description: Product deleted successfully
 *             content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Product deleted successfully'
 *          400:
 *              description: Bad request - Invalid input
 *          404:
 *              description: Product not found
 */
router.delete('/:id', 

    // Validation
    param('id')
        .isInt().withMessage('Id not valid'),
    handleInputErrors,
    deleteProduct
)

export default router