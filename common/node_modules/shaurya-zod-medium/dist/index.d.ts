import * as z from "zod";
export declare const signup: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signin: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const publishBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const updatingBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
export type signupInf = z.infer<typeof signup>;
export type signinInf = z.infer<typeof signin>;
export type publishInf = z.infer<typeof publishBlog>;
export type updateInf = z.infer<typeof updatingBlog>;
//# sourceMappingURL=index.d.ts.map