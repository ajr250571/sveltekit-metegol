import prisma from '$src/lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const jugadores = await prisma.jugador.findMany({
		orderBy: { nombre: 'asc' }
	});
	return { jugadores };
}) satisfies PageServerLoad;
