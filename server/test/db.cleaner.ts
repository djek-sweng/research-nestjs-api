import { PrismaClient } from '@prisma/client';

const tableNames = ['Notes', 'Users'];

export default async () => {
  const prisma = new PrismaClient();

  try {
    for (const tableName of tableNames) {
      await prisma.$executeRaw`DELETE FROM "${tableName}";`;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
