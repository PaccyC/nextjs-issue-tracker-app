import NextAuth from "next-auth/next";
import  GoogleProvider from 'next-auth/providers/google'

const handler= NextAuth({
    providers:[
        GoogleProvider({
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            clientId:process.env.GOOGLE_CLIENT_ID!,
             httpOptions:{
                timeout:15000
             }
        
        })
    ],
    secret:process.env.NEXTAUTH_KEY,
    debug:true
});




export {handler as GET, handler as POST}