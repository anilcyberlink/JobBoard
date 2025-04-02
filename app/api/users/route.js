import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// Handle POST request: Create a new user
export async function POST(req) {
  const body = await req.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(user);
}
