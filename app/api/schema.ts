import { z } from 'zod'



export const createUserSchema= z.object({
    email:z.string().email(),
    password: z.string().min(5)
})


export const issueSchema= z.object({
    title:z.string().min(1,"Title is required").max(255),
    description:z.string().min(1,"Description is required").max(255)
})

