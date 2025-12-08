import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createAdminClient } from '@/shared/lib/supabase/server';

interface ExtendedUser extends User {
  id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = createAdminClient();
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const supabase = createAdminClient();

        // Проверяем существует ли пользователь
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers?.users?.find(u => u.email === user.email);

        if (!existingUser) {
          // Создаем нового пользователя в Supabase с рандомным паролем
          const randomPassword = crypto.randomUUID();
          const { data: newUser, error } = await supabase.auth.admin.createUser({
            email: user.email!,
            password: randomPassword,
            email_confirm: true,
            user_metadata: {
              name: user.name,
              avatar_url: user.image,
              provider: 'google',
              email_verified: true,
            },
          });

          if (error) {
            console.error('Error creating user in Supabase:', error);
            return false;
          }

          (user as ExtendedUser).id = newUser.user.id;
        } else {
          (user as ExtendedUser).id = existingUser.id;
          
          // Обновляем метаданные
          await supabase.auth.admin.updateUserById(existingUser.id, {
            user_metadata: {
              ...existingUser.user_metadata,
              name: user.name,
              avatar_url: user.image,
              last_google_signin: new Date().toISOString(),
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = (user as ExtendedUser).id;
        token.email = user.email;
      }
      if (account?.provider === 'google') {
        token.provider = 'google';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id as string;
        // @ts-ignore
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };