import NextAuth, { User } from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/calendar.events",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    })
  ],
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account: any; user: User }) {
      // console.log('user,===>',user);
      // console.log('acc===>',account)      
      if (account) {
          token.access_token = account.access_token 
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.access_token) {
          session.access_token = token.access_token 
      }
      // console.log("user - ",user);
      return session
    },
    async signIn({ profile }) {
      // console.log('User Profile:', profile);
      return true;
    },
  }
});