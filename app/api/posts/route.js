// app/api/posts/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error fetching posts', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content, authorId } = await request.json();
    const newPost = await prisma.post.create({
      data: { title, content, authorId },
    });
    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error creating post', { status: 500 });
  }
}
