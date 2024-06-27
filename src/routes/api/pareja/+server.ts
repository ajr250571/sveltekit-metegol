import prisma from '$src/lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
	const currentMonthEnd = new Date(currentYear, currentMonth, 0);
	const parejas = await prisma.pareja.groupBy({
		by: ['pareja'],
		_count: {
			puntos: true
		},
		_sum: {
			puntos: true
		},
		orderBy: {
			pareja: 'asc'
		},
		where: {
			createdAt: {
				gte: currentMonthStart,
				lte: currentMonthEnd
			}
		}
	});

	interface RankingParejas {
		pareja: string;
		jugo: number;
		gano: number;
		eficiencia: number;
	}
	const rankingParejas: RankingParejas[] = [];
	parejas.forEach((pareja) => {
		const jugo = pareja._count.puntos;
		let gano = pareja._sum.puntos;
		let efi = 0;
		if (gano !== null) {
			efi = (gano / jugo) * 100;
		} else {
			gano = 0;
			efi = 0;
		}
		rankingParejas.push({
			pareja: pareja.pareja,
			jugo,
			gano,
			eficiencia: Number((Math.round(efi * 100) / 100).toFixed(1))
		});
	});
	// Ordena descendente
	rankingParejas.sort((a, b) => b.eficiencia - a.eficiencia);

	return Response.json(rankingParejas, { status: 201 });
};
