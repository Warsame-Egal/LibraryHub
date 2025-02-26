"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// Import the dotenv package to load environment variables from a .env file into process.env
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
// Retrieve MongoDB username from environment variables, default to an empty string if not set
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// Retrieve MongoDB password from environment variables, default to an empty string if not set
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
// Construct the MongoDB connection URL using the retrieved username and password
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/library`;
// Retrieve the server port from environment variables, default to 8000 if not set
const PORT = process.env.SECRET_PORT ? Number(process.env.SERVER_PORT) : 8000;
// Export the configuration object containing MongoDB URL and server port
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT
    }
};
