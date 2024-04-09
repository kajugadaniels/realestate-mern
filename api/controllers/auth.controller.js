import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Password:', password);
        console.log('Hashed Password:', hashedPassword);

        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log('New User:', newUser);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to create user!' });
    }
}

export const login = async (req, res) => {
    
}

export const logout = (req, res) => {
    console.log("Logout endpoints")
}