import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prismaClient = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
	const data = await req.json();
	await prismaClient.user.create({
		data: {
			username: data.username,
			password: data.password,
		},
	});
	console.log(data);

	return NextResponse.json({
		message: "Sign up endpoint hit",
	});
}

export async function GET(req: NextRequest) {
	const user = await prismaClient.user.findFirst();

	return NextResponse.json({
		user,
	});
}
