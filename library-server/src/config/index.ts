// Import the dotenv package to load environment variables from a .env file into process.env
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Retrieve MongoDB username from environment variables, default to an empty string if not set
const MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';

// Retrieve MongoDB password from environment variables, default to an empty string if not set
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';

// Construct the MongoDB connection URL using the retrieved username and password
const MONGO_URL: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/library`;

// Retrieve the server port from environment variables, default to 8000 if not set
const PORT: number = process.env.SECRET_PORT ? Number(process.env.SERVER_PORT) : 8000;

// Retrieve the number of rounds for password hashing, default to a random number between 0 and 10 if not set
const ROUNDS: number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);

// Export the configuration object containing MongoDB URL and server port
export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
};