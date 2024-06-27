import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		return Response.json(null, { status: 401, statusText: 'Unauthorized' });
	}

	const users = await prisma.user.findMany();
	return Response.json(users);
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		return Response.json(null, { status: 401, statusText: 'Unauthorized' });
	}

	const data = await request.json();
	const user = await prisma.user.findFirst({
		where: {
			email: data.email
		},
		select: {
			id: true,
			name: true,
			email: true,
			password: true
		}
	});
	if (user === null) {
		return Response.json({ message: 'User not found' }, { status: 401 });
	}

	return Response.json(user, { status: 201 });
};
