import * as z from "zod";
export const signup = z.object({
    email: z.email(),
    password: z.string().min(6)
});
export const signin = z.object({
    email: z.email(),
});
export const publishBlog = z.object({
    title: z.string(),
    content: z.string().min(10)
});
export const updatingBlog = z.object({
    title: z.string(),
    content: z.string().min(10),
    id: z.number()
});
//# sourceMappingURL=index.js.map