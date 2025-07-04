// @ts-ignore
import express, {Response, Request} from 'express';
import authMiddleware, {AuthenticatedRequest} from '../middleware/authMiddleware';
import {z} from 'zod';
import prisma from '../prismaClient';

const router = express.Router({mergeParams: true});

// Route to get a user's links
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


// Schema to validate the link data
const linkSchema = z.object({
    title: z.string().trim().min(1).max(100),
    url: z.string().trim().url(),
});

// Schema to validate an array of links
const linksArraySchema = z.array(linkSchema).max(10);

// Route to over wright existing user's links with the new provided links
router.put('/:username', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    const {username} = req.params;
    const {username: tokenUsername} = req;

    if (username !== tokenUsername) {
        return res.status(403).json({ message: "Forbidden: You can only edit your own links" });
    }

    const parseResult = linksArraySchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid link data", errors: parseResult.error.errors });
    }

    const validLinks = parseResult.data;

    // Use a Prisma transaction to delete the existing links and add the new ones
    try {
        await prisma.$transaction([
            prisma.links.deleteMany({
                where: {user_id: req.userId}
            }),
            prisma.links.createMany({
                data: validLinks.map(link => ({
                    user_id: req.userId,
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