"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and types from express
const express_1 = __importDefault(require("express"));
// Import cors for handling Cross-Origin Resource Sharing
const cors_1 = __importDefault(require("cors"));
// Import the configuration object from the config file
const config_1 = require("./config");
// Import mongoose for MongoDB connection
const mongoose_1 = __importDefault(require("mongoose"));
// Retrieve the server port from the configuration
const Port = config_1.config.server.port;
// Create an instance of an Express application
const app = (0, express_1.default)();
// Immediately invoked function to establish a connection to the MongoDB database
(function starUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB using the URL from the configuration
            yield mongoose_1.default.connect(config_1.config.mongo.url, { w: "majority", retryWrites: true, authMechanism: "DEFAULT" });
        }
        catch (error) {
            // Log an error message if the connection fails
            console.log("Could not make a connection to the database");
        }
    });
})();
// Middleware to parse JSON bodies for the API
app.use(express_1.default.json()); // parse JSON bodies for the API
// Middleware to enable CORS, allowing requests from different origins
app.use((0, cors_1.default)());
// Health check endpoint to verify that the server is running
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});
// Start the server and listen on the specified port
app.listen(Port, () => {
    console.log(`Server listening on port ${Port}`);
});
