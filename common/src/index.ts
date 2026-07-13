import * as z from "zod";

export const signup = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const signin = z.object({
    email: z.email(),
})

export const publishBlog = z.object({
    title: z.string() ,
    content: z.string().min(10)
})

export const updatingBlog = z.object({
    title: z.string() ,
    content: z.string().min(10),
    id: z.number()
})

export type signupInf = z.infer<typeof signup>
export type signinInf = z.infer<typeof signin>
export type publishInf = z.infer<typeof publishBlog>
export type updateInf = z.infer<typeof updatingBlog>