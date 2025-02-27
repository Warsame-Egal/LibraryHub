import {Express, Request, Response} from 'express';
import authRoutes from './AuthRoutes';

export function registerRoutes(app:Express) {

    // Health check endpoint to verify that the server is running
    app.get("/health", (req: Request, res: Response) => { 
        res.status(200).json({ message: "Server is running" });
    })
    app.use("/auth", authRoutes);
}