import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/prisma";
import bcrypt from 'bcrypt'
export async function POST(request:NextRequest){
    const body= await request.json();
    
    const user = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    })
    if(user){
        return  NextResponse.json({error:"User already exists"},{status:400})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(body.password,salt)
    const newUser= await prisma.user.create({
        data:{
            email:body.email,
            hashedPassword
        }
    })
    return NextResponse.json({email:newUser.email})

}