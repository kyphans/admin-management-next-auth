import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

/**
 * The authentication configuration for the application.
 *
 * @type {NextAuthConfig}
 * @property {Array} providers - An array of authentication providers.
 * @property {Object} adapter - The adapter used for database integration.
 *                              Creating a database adapter [https://authjs.dev/guides/creating-a-database-adapter]
 * @property {Object} callbacks - Callback functions for various authentication events.
 */

export const config: NextAuthConfig = {
  debug: process.env.AUTH_DEBUG_MODE === 'true',
  session: { strategy: 'jwt' },
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials) {
        if (credentials.password !== '123456789') throw new Error("User not found.");
        return {
          id: 'test',
          name: 'Test User',
          email: 'test@example.com'
        };
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // console.log('redirect----------------', { url, baseUrl });
      return process.env.BASE_URL ?? baseUrl;
    },
    jwt(params) {
      const { token, user, account } = params;
      console.log('jwt----------------', params);

      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      // session.user.id = token.id
      return session
    },
    // async session({ session, token }) {
    //   // Gửi các thuộc tính tới client, như accessToken từ nhà cung cấp
    //   // console.log('session----------------', session);
    //   console.log('token----------------', token);
    //   return session;
    // }
    // async signIn({ profile }) {
    //   // Chỉ cho phép đăng nhập cho những người dùng có email kết thúc bằng "yourdomain.com"
    //   return profile?.email?.endsWith("@yourdomain.com");
    // },
  },
  // pages: {
  //   signIn: '/sign-in'
  //   // signOut: '/auth/sign-out',
  //   // error: '/auth/error',
  //   // verifyRequest: '/auth/verify-request',
  //   // newUser: '/auth/new-user'
  // }
};

/**
 * This code is exporting several items from the NextAuth configuration.
 *
 * @param {Object} auth - The main NextAuth object for handling authentication.
 * @param {Array} handlers - An array of custom handlers for various authentication events.
 * @param {Function} signIn - A function to handle sign-in events.
 * @param {Function} signOut - A function to handle sign-out events.
 */
export const { auth, handlers, signIn, signOut } = NextAuth(config);
