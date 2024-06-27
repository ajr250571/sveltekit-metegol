import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.auth();
	if (!session?.user?.id) {
		return Response.json(null, { status: 401, statusText: 'Unauthorized' });
	}
	try {
		const data = await prisma.user.findUnique({
			where: {
				id: Number(params.id)
			}
		});
		if (data === null) {
			return Response.json({ message: 'User not found' }, { status: 400 });
		}
		return Response.json(data, { status: 201 });
	} catch (error) {
		return Response.json({ message: error }, { status: 500 });
	}
};
