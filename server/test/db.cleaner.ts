import { PrismaClient } from '@prisma/client';

export default async () => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  try {
    await prisma.note.deleteMany();
    await prisma.user.deleteMany();
  } catch (err) {
    console.error(err);
  }

  await prisma.$disconnect();
};
