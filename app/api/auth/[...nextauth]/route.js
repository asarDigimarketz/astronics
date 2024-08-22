// app/api/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/utils/models/userModel";
import { connectDb } from "@/utils/lib/connectDb";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await connectDb();

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email }).exec();

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Incorrect password");
        }

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // The `session` callback is called whenever a session is checked
      // We attach the user details from the token to the session
      session.user = {
        id: token.sub, // User ID from the token
        email: token.email, // User email from the token
        image: token.picture,
        name: token.name, // User profile image URL from the token
      };
      return session;
    },
    async jwt({ token, user }) {
      // The `jwt` callback is called whenever a JWT is created or updated
      if (user) {
        token.sub = user.id; // User ID from the user object
        token.email = user.email; // User email from the user object
        token.picture = user.image;
        token.name = token.name; // User profile image URL from the user object
      }
      return token;
    },
  },
};

export async function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
