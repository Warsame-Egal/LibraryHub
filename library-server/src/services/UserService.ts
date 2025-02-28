// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

// Import configuration
import { config } from '../config';

// Import UserDao and IUserModel for database operations
import UserDao, { IUserModel } from '../daos/UserDao';
// Import IUser interface
import { IUser } from '../models/User';
import { UnableToSaveUserError, InvalidUserNameOrPasswordError } from '../utils/LibraryErrors';

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
        throw new UnableToSaveUserError(error);
    }
}

// Authenticate a user
export async function login(credentials: { email: string, password: string }): Promise<IUserModel> {
    const { email, password } = credentials;

    try {
        // Find the user by email
        const user = await UserDao.findOne({ email });

        if (!user) {
            throw new InvalidUserNameOrPasswordError("Invalid username or password");
        }

        // Compare the provided password with the stored hashed password
        const validPassword: boolean = await bcrypt.compare(password, user.password);

        if (validPassword) {
            return user;
        } else {
            throw new InvalidUserNameOrPasswordError("Invalid username or password");
        }

    } catch (error: any) {
        // Throw an error if authentication fails
        throw error;
    }
}