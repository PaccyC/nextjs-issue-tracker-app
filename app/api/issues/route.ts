import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/prisma";

import {issueSchema} from "../schema"

export async function POST(request:NextRequest){

    const body = await request.json();
    const validation= issueSchema.safeParse(body)
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