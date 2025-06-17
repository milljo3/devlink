// @ts-ignore
import express from 'express';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import prisma from '../prismaClient';
import {z} from 'zod';

const router = express.Router();

const authSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6),
});

router.post('/register', async (req, res) => {
    try {
        const {username, password} = authSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where: {username}
        });
        if (existingUser) {
            return res.status(400).send({message: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(201).send({token, username, message: 'User created successfully'});
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({message: error.errors});
        }
        return res.status(400).send({message: 'Server Error'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = authSchema.parse(req.body);

        const user = await prisma.user.findUnique({
            where: {username}
        });
        if (!user) {
            return res.status(400).send({message: 'Username or password is incorrect'});
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).send({message: 'Invalid username or password'});
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).send({token, username, message: "Login success"});
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({message: error.errors});
        }
        return res.status(400).send({message: 'Server Error'});
    }
});

export default router;