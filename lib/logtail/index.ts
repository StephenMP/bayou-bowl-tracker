import { ILogtailLog, Context, Middleware } from "@logtail/types";
import { Node as Logtail } from '@logtail/js'

export interface ILogger {
    debug(message: string, context?: Context): void
    error(message: string, context?: Context): void
    info(message: string, context?: Context): void
    warn(message: string, context?: Context): void
    use(fn: Middleware): void
}

export class Logger implements ILogger {
    constructor(private logger: Logtail | Console) { }

    debug(message: string, context?: Context) {
        this.logger.debug(message, context)
    };

    error(message: string, context?: Context) {
        this.logger.warn(message, context)
    };

    info(message: string, context?: Context) {
        this.logger.info(message, context)
    };

    warn(message: string, context?: Context) {
        this.logger.warn(message, context)
    };

    use(fn: Middleware) {
        if (this.logger['use']) {
            (this.logger as Logtail).use(fn)
        }
    }
}

async function enrichLogs(log: ILogtailLog): Promise<ILogtailLog> {
    return {
        ...log,
    };
}

function getLogtail(): ILogger {
    let logger = new Logger(console)

    if (process.env.NODE_ENV === 'production') {
        logger = new Logger((global.logtail || new Logtail(process.env.LOGTAIL_SOURCE_TOKEN)) as Logtail)
        logger.use(enrichLogs)
    }

    return logger
}

export const logger: ILogger = getLogtail()

if (process.env.NODE_ENV == 'production') {
    global.logtail = logger
}
