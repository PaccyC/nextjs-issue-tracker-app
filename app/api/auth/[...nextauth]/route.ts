import NextAuth from "next-auth/next";
import  GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";


const prisma= new PrismaClient()
export const authOptions:NextAuthOptions ={
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            clientId:process.env.GOOGLE_CLIENT_ID!,
             httpOptions:{
                timeout:15000
             },
             
        
        })
    ],
    session:{
        strategy: "jwt"
    },
    secret:process.env.NEXT_AUTH_KEY,
    debug:true
}

const handler= NextAuth(authOptions);




export {handler as GET, handler as POST}