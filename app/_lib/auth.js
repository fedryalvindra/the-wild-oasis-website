import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

// call NextAuth with config obj
const authConfig = {
  // arr: cause u might use google, github etc
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // CredentialProvider for your own credential
  ],
  callbacks: {
    // if ret true current user is authorized
    // auth: cur session, request obj
    authorized({ auth, request }) {
      // if auth.user exist ret true
      return !!auth?.user;
    },
    // signIn runs before the actual signUp process happens (like middleware)
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        // return true to move on the sign in process
        return true;
      } catch {
        return false;
      }
    },
    // runs after the signin callback (session same as await auth)
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    // signIn in login page
    signIn: "/login",
  },
};

// auth function can we call in any server component
export const {
  auth,
  // signIn and signOut is server flow so can't be in client component
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
