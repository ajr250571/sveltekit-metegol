import prisma from '$src/lib/prisma';
import type { RequestHandler } from './$types';

export const GET = async () => {
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
	const currentMonthEnd = new Date(currentYear, currentMonth, 0);
	const jugadores = await prisma.partido.groupBy({
		by: ['jugadorId'],
		_count: {
			puntos: true
		},
		_sum: {
			puntos: true
		},
		orderBy: {
			_sum: {
				puntos: 'desc'
			}
		},
		where: {
			createdAt: {
				gte: currentMonthStart,
				lte: currentMonthEnd
			}
		}
	});
	if (!jugadores) {
		return Response.json({ message: 'Partidos no encontrados...' }, { status: 404 });
	}
	const result = [];
	for (const jugador of jugadores) {
		const jugadorNombre = await prisma.jugador.findUnique({
			where: {
				id: jugador.jugadorId
			},
			select: {
				nombre: true
			}
		});
		let eficiencia = 0;
		if (jugador._sum.puntos) {
			eficiencia = Number(((jugador._sum.puntos * 100) / jugador._count.puntos).toFixed(1));
		} else {
			eficiencia = 0;
		}
		result.push({
			id: jugador.jugadorId,
			nombre: jugadorNombre?.nombre,
			jugo: jugador._count.puntos,
			gano: jugador._sum.puntos,
			eficiencia
		});
	}
	return Response.json(result, { status: 201 });
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		return Response.json(null, { status: 401, statusText: 'Unauthorized' });
	}

	const partidoUUID = crypto.randomUUID();

	// Graba Partido
	interface Jugador {
		id: number;
		nombre: string;
		jugo: boolean;
		gano: boolean;
	}
	const partido: Jugador[] = await request.json();
	interface Participante {
		partido: string;
		fecha: Date;
		equipo: string;
		puntos: number;
		jugadorId: number;
		userId: number;
	}
	const data: Participante[] = [];
	partido.map((jugador) => {
		if (jugador.jugo) {
			data.push({
				partido: partidoUUID,
				fecha: new Date(),
				equipo: jugador.gano ? 'Ganador' : 'Perdedor',
				puntos: jugador.gano ? 1 : 0,
				jugadorId: jugador.id,
				userId: Number(session.user.id)
			});
		}
	});
	await prisma.partido.createMany({
		data
	});

	// Graba Parejas
	let parejaGanadora = '';
	let parejaPerdedora = '';

	partido.forEach((jugador) => {
		if (jugador.jugo) {
			if (jugador.gano) {
				parejaGanadora += jugador.nombre + '/';
			} else {
				parejaPerdedora += jugador.nombre + '/';
			}
		}
	});
	await prisma.pareja.create({
		data: {
			fecha: new Date(),
			partido: partidoUUID,
			pareja: parejaGanadora.slice(0, -1),
			puntos: 1,
			userId: Number(session.user.id)
		}
	});
	await prisma.pareja.create({
		data: {
			fecha: new Date(),
			partido: partidoUUID,
			pareja: parejaPerdedora.slice(0, -1),
			puntos: 0,
			userId: Number(session.user.id)
		}
	});

	return Response.json(null, { status: 201 });
};
