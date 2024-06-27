import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
	const emailFound = await prisma.user.findUnique({
		where: { email: data.email }
	});

	if (emailFound) {
		return Response.json(
			{
				message: 'Email already exists.'
			},
			{ status: 404 }
		);
	}
	const hashPassword = await bcrypt.hash(data.password, 10);
	const userNew = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: hashPassword
		},
		select: {
			id: true,
			email: true,
			name: true
		}
	});
	// const { password, ...user } = userNew;
	return Response.json(userNew, { status: 201 });
};
