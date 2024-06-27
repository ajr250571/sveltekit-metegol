import prisma from '$lib/prisma';
// GET http://[::1]:5173/api/blog
export const GET = async () => {
	const data = await prisma.post.findMany();
	return Response.json(data);
};
