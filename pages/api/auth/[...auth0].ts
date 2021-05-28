import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { UserEntity } from '../../../entities/user-entity';
import { UserRepository } from '../../../repositories/user-repository';
import { UserProfile, Session, Claims } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client'

async function saveNewUser(auth0User: UserProfile) {
    const userRepository = new UserRepository()
    const user = {
        email: auth0User.email,
        email_verified: auth0User.email_verified,
        name: auth0User.name,
        nickname: auth0User.nickname,
        picture: auth0User.picture,
        sub: auth0User.sub
    } as User

    userRepository.saveNewUser(user)
}

export default handleAuth({
    callback: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handleCallback(req, res, {
                afterCallback: (req: NextApiRequest, res: NextApiResponse, session: Session, state) => {
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
