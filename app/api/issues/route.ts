import { NextRequest, NextResponse } from "next/server";
import  {z} from 'zod'
import prisma from "@/prisma/prisma";
const createIssueSchema= z.object({
    title:z.string().min(1,"Title is required").max(255),
    description:z.string().min(1,"Description is required").max(255)
})

export async function POST(request:NextRequest){

    const body = await request.json();
    const validation= createIssueSchema.safeParse(body)
    if(!validation.success){
        return NextResponse.json({error:validation.error.errors},{status:400})
    }

    const newIssue=await prisma.issue.create({
        data:{
            title:body.title,
            desription:body.description
        }
    })
    return NextResponse.json(newIssue,{status:201})
    
}