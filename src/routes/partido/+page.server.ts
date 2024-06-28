import prisma from '$src/lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.auth();
	if (!session?.user?.id) {
		redirect(303, `/auth/login`);
	}
	const jugadores = await prisma.jugador.findMany({
		orderBy: { nombre: 'asc' }
	});
	return {
		jugadores,
		session
	};
}) satisfies PageServerLoad;
