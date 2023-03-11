import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      first_name?: string;
      email: string;
      country?: string;
    } & DefaultSession['user'];
  }
}
