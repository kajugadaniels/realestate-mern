import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) return res.status(401).json({ message: "Invalid credentials" })

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ message: "Wrong password" })

        // Generate cookie token and send to the user
        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign(
            {
                id:user.id
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        )

        const { password: userPassword, ...userInfo } = user

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: age
        })
        .status(200)
        .json(userInfo)
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to login user" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" })
}