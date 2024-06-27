import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (events) => {
	const session = await events.locals.auth();
	if (!session) {
		redirect(303, `/auth/login`);
	}
	const data = await prisma.post.findMany();

	return {
		posts: data,
		session
	};
}) satisfies PageServerLoad;
