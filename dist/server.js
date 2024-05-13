"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const db_1 = __importDefault(require("./config/db"));
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
    }
    catch (error) {
        console.log(colors_1.default.red.bold('Unable to connect to the database'));
    }
}
exports.connectDB = connectDB;
connectDB();
// Instance of express
const server = (0, express_1.default)();
// Conexion of cors
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
// Read data of forms
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
// use content the http request. ej: get, post, put, patch, delete
server.use('/api/products', router_1.default);
// Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
//# sourceMappingURL=server.js.map