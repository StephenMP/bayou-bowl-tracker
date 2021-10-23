import { PrismaClient } from '@prisma/client'
import { Node as Logtail } from '@logtail/js'
import { ILogger } from '../lib/logtail'

declare global {
    var prisma: PrismaClient | undefined
    var logtail: ILogger | undefined
  }