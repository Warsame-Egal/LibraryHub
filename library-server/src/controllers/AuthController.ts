// Import necessary modules and types
import { Response, Request } from 'express';
import { register } from '../services/UserService';
import { IUser } from '../models/User';

// Handle user registration
async function handleRegister(req: Request, res: Response) {
    const user: IUser = req.body;

    try {
        // Register the user
        const registeredUser = await register(user);

        // Respond with the registered user details
        res.status(201).json({
            message: "User successfully created",
            user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            }
        });
    } catch (error: any) {
        // Respond with an error message if registration fails
        res.status(500).json({ message: "Unable to register user at this time", error: error.message });
    }
}

export default { handleRegister };