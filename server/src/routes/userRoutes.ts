// @ts-ignore
import express, {Response, Request} from 'express';
import authMiddleware, {AuthenticatedRequest} from '../middleware/authMiddleware';
import {z} from 'zod';
import prisma from '../prismaClient';

const router = express.Router({mergeParams: true});

router.get('/:username', async (req: Request, res: Response) => {
    const {username} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {username},
            include: {
                links: true
            }
        });

        if (!user) {
            res.status(404).send('User not found');
        }

        res.status(200).send({
            username: user.username,
            links: user.links
        });
    }
    catch (error) {
        res.status(500).send({message: 'Server error', error: error});
    }
})


const linkSchema = z.object({
    title: z.string().min(1).max(100),
    url: z.string().url(),
});
const linksArraySchema = z.array(linkSchema).max(20);

router.put('/:username', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    const paramUsername = req.params.username;
    const {username, userId} = req;

    if (paramUsername !== username) {
        return res.status(403).send({message: 'You are not authorized to edit this user’s links'});
    }

    const validation = linksArraySchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).send({message: validation.error.errors});
    }

    const links = validation.data;

    try {
        await prisma.$transaction([
            prisma.links.deleteMany({
                where: {user_id: userId}
            }),
            prisma.links.createMany({
                data: links.map(link => ({
                    user_id: userId,
                    title: link.title,
                    url: link.url
                }))
            })
        ]);

        res.status(200).send({message: 'Successfully updated links'});
    }
    catch (error) {
        res.status(500).send({message: 'Server Error', error: error});
    }
});

export default router;