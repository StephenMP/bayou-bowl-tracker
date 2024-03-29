import { handleAuth, handleCallback, handleLogin, Session, UserProfile } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import { createUser } from '../../../repositories/user';
import { NextApiResponseServerIO } from '../../../types/next';
import { logger } from '../../../lib/logtail'

async function saveNewUser(auth0User: UserProfile): Promise<User> {
    const user = {
        email: auth0User.email,
        email_verified: auth0User.email_verified,
        name: auth0User.name,
        nickname: auth0User.nickname,
        picture: auth0User.picture,
        sub: auth0User.sub
    } as User

    await createUser(user)
    return user
}

export default handleAuth({
    login: async (req, res) => {
        await handleLogin(req, res, {
            returnTo: "/user/profile",
        });
    },
    callback: async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        try {
            await handleCallback(req, res, {
                afterCallback: async (req: NextApiRequest, res: NextApiResponseServerIO, session: Session, state) => {
                    const user = await saveNewUser(session.user)
                    logger.info('User signed in successfully', {
                        user
                    })
                    return session
                }
            })
        }
        catch (error) {
            res.status(error.status || 400).end(error.message)
        }
    }
});
