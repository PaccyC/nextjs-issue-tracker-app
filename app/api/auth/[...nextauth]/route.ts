import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials.password) return null

                const user = await prisma.user.findUnique({ where: { email: credentials.email } })

                if(!user) return null
                
               const match= await bcrypt.compare(credentials.password,user.hashedPassword!)
               if(match) return user
               else return null
            },
        },
        ),

        GoogleProvider({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            clientId: process.env.GOOGLE_CLIENT_ID!,
            httpOptions: {
                timeout: 15000
            },


        }),

    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_AUTH_KEY,
    debug: true
}

const handler = NextAuth(authOptions);




export { handler as GET, handler as POST }