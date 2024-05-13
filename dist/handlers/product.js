"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    const products = await Product_model_1.default.findAll({
        order: [
            ['price', 'DESC']
        ]
    });
    res.json({ data: products });
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            errors: 'Product not found'
        });
    }
    res.json({ data: product });
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    const product = await Product_model_1.default.create(req.body);
    res.status(201).json({ data: product });
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            errors: 'Product not found'
        });
    }
    // Update product
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            errors: 'Product not found'
        });
    }
    // Update product
    product.availability = !product.availability;
    await product.save();
    res.json({ data: product });
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            errors: 'Product not found'
        });
    }
    await product.destroy();
    res.json({ data: 'Product deleted successfully' });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map