import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$src/lib/prisma';

export const load: PageServerLoad = async (events) => {
	const session = await events.locals.auth();
	if (!session?.user?.id) {
		redirect(303, `/auth/login`);
	}
	const users = await prisma.user.findMany();
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
	const currentMonthEnd = new Date(currentYear, currentMonth, 0);
	const parejasPuntos = await prisma.pareja.findMany({
		orderBy: {
			id: 'desc'
		},
		take: 80,
		select: {
			partido: true,
			pareja: true,
			puntos: true,
			userId: true
		},
		where: {
			createdAt: {
				gte: currentMonthStart,
				lte: currentMonthEnd
			}
		}
	});
	interface Parejas {
		gano: string;
		perdio: string;
		usuario: string;
	}
	const parejas: Parejas[] = [];

	let gano = '';
	let perdio = '';
	let usuario = '';

	parejasPuntos.forEach(async (pareja) => {
		if (pareja.puntos === 0) {
			perdio = pareja.pareja;
			const user = users.find((user) => user.id === pareja.userId);
			usuario = user?.name as string;
		} else {
			gano = pareja.pareja;
			parejas.push({
				gano,
				perdio,
				usuario
			});
		}
	});

	return {
		session,
		parejas
	};
};
