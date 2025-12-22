import z from "zod";

export const SignupSchema = z.object({
    email: z.email(), 
    password: z.string(), 
}) 

export type SignupValues = z.infer<typeof SignupSchema>

export const LoginSchema = z.object({
    email: z.email(), 
    password: z.string(), 
})
export type LoginValues = z.infer<typeof LoginSchema>