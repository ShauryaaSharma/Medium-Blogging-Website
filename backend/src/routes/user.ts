import { Hono } from 'hono'
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signup, signin } from 'shaurya-zod-medium';

export const userEntrance = new Hono<{
    Bindings: Bindings,
    Variables: {
        userId: string
    }
}>()

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}



userEntrance.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

    const parsed = signup.safeParse(body);
    if (!parsed.success) {
        c.status(400);
        return c.json({
            message: "INVALID INPUT YOU DUMB BASTARD"
        })
    } else {
        try {
            const user = await prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password
                }
            });
            const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256');
            return c.json({ jwt });
        } catch (e) {
            c.status(403);
            console.log(e)
            return c.text("Error in Signing Up")
        }
    }
})

userEntrance.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();

    const parsed = signin.safeParse(body);
    if (!parsed.success) {
        c.status(403);
        return c.json({
            message: "INVALID INPUT YOU DUMB BASTARD"
        })
    } else {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            });

            if (!user) {
                c.status(403);
                return c.json({ error: "TRYA ENTER WITHOUT PERMISSION HUH??" });
            } else {
                const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256');
                return c.json({ jwt });
            }
        } catch (e) {
            c.status(403);
            return c.text("Error in Signing In")
        }
    }

})