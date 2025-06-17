// @ts-ignore
import express from 'express';
// @ts-ignore
import bcrypt from 'bcryptjs';
// @ts-ignore
import jwt from 'jsonwebtoken';
// @ts-ignore
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

        return res.status(201).send({message: 'User created successfully.', userId: user.id, token});
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({error: error.errors});
        }
        return res.status(400).send({message: 'Server Error', error: error});
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

        return res.status(200).send({message: 'Login successful', token});
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).send({error: error.errors});
        }
        return res.status(400).send({error: 'Server Error: ' + error});
    }
});

export default router;