import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { id } = params; // Get the post ID from the URL parameter

  try {
    const { title, content } = await request.json();

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });

    return new Response(JSON.stringify(updatedPost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error updating post', { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params; // Get the post ID from the URL parameter

  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting post', { status: 500 });
  }
}
