// Import necessary modules and types from express
import express, { Express, Request, Response } from 'express';
// Import cors for handling Cross-Origin Resource Sharing
import cors from 'cors';
// Import the configuration object from the config file
import { config } from './config';
// Import mongoose for MongoDB connection
import mongoose from 'mongoose';

import {registerRoutes} from './routes';

// Retrieve the server port from the configuration
const Port = config.server.port;

// Create an instance of an Express application
const app: Express = express(); 

// Middleware to parse JSON bodies for the API
app.use(express.json()); // parse JSON bodies for the API

// Middleware to enable CORS, allowing requests from different origins
app.use(cors()); 

// Immediately invoked function to establish a connection to the MongoDB database
(async function starUp() {
    try {
        // Connect to MongoDB using the URL from the configuration
        await mongoose.connect(config.mongo.url, { w: "majority", retryWrites: true, authMechanism: "DEFAULT" });
        console.log("Connection to MongoDB successful");

        //routes
        registerRoutes(app);

        // Start the server and listen on the specified port
        app.listen(Port, () => {
        console.log(`Server listening on port ${Port}`);
})

    } catch (error) {
        // Log an error message if the connection fails
        console.log("Could not make a connection to the database");

    }
})();

