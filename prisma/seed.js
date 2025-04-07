const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');  // Import bcrypt to hash passwords

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash('defaultPassword', 10);

    // Create a user (needed for the posts)
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
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
  } catch (e) {
    console.error('Error seeding data:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
