// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

// Import configuration
import { config } from '../config';

// Import UserDao and IUserModel for database operations
import UserDao, { IUserModel } from '../daos/UserDao';
// Import IUser interface
import { IUser } from '../models/User';

// Register a new user
export async function register(user: IUser): Promise<IUserModel> {
    const ROUNDS = config.server.rounds;

    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

        // Create a new user with the hashed password
        const saved = new UserDao({ ...user, password: hashedPassword });

        // Save the user to the database
        return await saved.save();
    } catch (error: any) {
        // Throw an error if user creation fails
        throw new Error("Unable to create user at this time");
    }
}