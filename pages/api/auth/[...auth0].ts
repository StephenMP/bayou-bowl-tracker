import { handleAuth, handleCallback, Session, UserProfile } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { NextApiRequest } from 'next';
import { createUser } from '../../../repositories/user';
import { NextApiResponseServerIO } from '../../../types/next';

async function saveNewUser(auth0User: UserProfile) {
    const user = {
        email: auth0User.email,
        email_verified: auth0User.email_verified,
        name: auth0User.name,
        nickname: auth0User.nickname,
        picture: auth0User.picture,
        sub: auth0User.sub
    } as User

    createUser(user)
}

export default handleAuth({
    callback: async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        try {
            await handleCallback(req, res, {
                afterCallback: (req: NextApiRequest, res: NextApiResponseServerIO, session: Session, state) => {
                    saveNewUser(session.user)
                    return session
                }
            })
        }
        catch (error) {
            res.status(error.status || 400).end(error.message)
        }
    }
});
