import prisma from '$lib/prisma';
import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}
}

export const { signIn, signOut, handle } = SvelteKitAuth({
	providers: [
		Credentials({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'usuario@dominio.com'
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: 'Contraseña'
				}
			},
			authorize: async (credentials) => {
				const { email, password } = credentials;
				const user = await prisma.user.findFirst({
					where: { email: email as string }
				});

				if (!user) {
					throw new Error('Invalid credentials');
				}
				const validPassword = await bcrypt.compare(password as string, user.password);
				if (!validPassword) throw new Error('Invalid credentials');
				return {
					id: String(user.id),
					name: user.name,
					email: user.email
				};
			}
		})
	],
	pages: {
		signIn: '/auth/login'
	},
	trustHost: true,
	callbacks: {
		session: async ({ session, token }) => {
			if (token) {
				session.user.id = token.sub as string;
			}
			// `session.user.userId` is now a valid property, and will be type-checked
			// in places like `useSession().data.user` or `auth().user`
			return session;
		}
	}
});
