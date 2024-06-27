import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const data = await prisma.post.findFirst({
		where: { slug: params.slug }
	});
	return { post: data };
}) satisfies PageServerLoad;
