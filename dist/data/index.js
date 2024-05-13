"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const db_1 = __importDefault(require("../config/db"));
const clearDB = async () => {
    try {
        await db_1.default.sync({ force: true });
        console.log('Database cleared');
        (0, node_process_1.exit)(0);
    }
    catch (error) {
        console.log(error);
        (0, node_process_1.exit)(1);
    }
};
if (process.argv[2] === '--clear') {
    clearDB();
}
//# sourceMappingURL=index.js.map