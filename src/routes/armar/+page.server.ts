import prisma from '$src/lib/prisma';
import type { PageServerLoad } from './$types';

function barajar(array: number[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const load = (async () => {
	const numeros = [1, 2, 3, 4, 5]; // Ejemplo de array
	const longitudArray = numeros.length;
	const indiceAleatorio = Math.floor(Math.random() * longitudArray);
	const saleId = numeros[indiceAleatorio];
	const jugadorSale = await prisma.jugador.findUnique({
		where: {
			id: saleId
		},
		select: {
			nombre: true
		}
	});
	numeros.splice(indiceAleatorio, 1);
	const parejas = barajar(numeros);
	let pareja1 = '';
	let pareja2 = '';
	for (let index = 0; index < parejas.length; index++) {
		const element = parejas[index];
		const jugador = await prisma.jugador.findUnique({
			where: {
				id: element
			},
			select: {
				nombre: true
			}
		});
		if (index === 0 || index === 1) {
			pareja1 += jugador?.nombre + '/';
		} else {
			pareja2 += jugador?.nombre + '/';
		}
	}
	return {
		sale: jugadorSale?.nombre,
		pareja1,
		pareja2
	};
}) satisfies PageServerLoad;
