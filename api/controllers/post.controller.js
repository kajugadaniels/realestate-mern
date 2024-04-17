import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()

        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get posts" })
    }
}

export const getPost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

export const addPost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    try {
        const post = await prisma.post.findUnique({
            where: { id }
        })

        if(post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" })
        }

        await prisma.post.delete({
            where: { id }
        })

        res.status(200).json({ message: "Post deleted" })
    } catch (error) {
        console.log(error)
    }
}
