const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a user (needed for the posts)
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  // Create posts for the user
  await prisma.post.createMany({
    data: [
      {
        title: 'My First Post',
        content: 'This is the content of my first post.',
        authorId: user.id, // Reference the user by their ID
      },
      {
        title: 'Another Post',
        content: 'This is some content for the second post.',
        authorId: user.id, // Reference the user by their ID
      },
    ],
  });

  console.log('Data seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
