import { PrismaClient } from '@prisma/client'
import { Node as Logtail } from '@logtail/js'
import { ILogger } from '../lib/logtail'
import { Redis } from 'ioredis'

declare global {
    var gPrisma: PrismaClient | undefined
    var gLogger: ILogger | undefined
    var gRedis: Redis | undefined
  }