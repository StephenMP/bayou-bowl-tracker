import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient =
  global.gPrisma ||
  new PrismaClient({
    log: ['warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.gPrisma = prisma
}
