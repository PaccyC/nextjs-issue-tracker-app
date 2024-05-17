import NextAuth from "next-auth/next";
import  GoogleProvider from 'next-auth/providers/google'

export const authOptions={
    providers:[
        GoogleProvider({
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            clientId:process.env.GOOGLE_CLIENT_ID!,
             httpOptions:{
                timeout:15000
             }
        
        })
    ],
    secret:process.env.NEXT_AUTH_KEY,
    debug:true
}

const handler= NextAuth(authOptions);




export {handler as GET, handler as POST}