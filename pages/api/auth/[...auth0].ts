import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { UserEntity } from '../../../entities/user-entity';
import { UserRepository } from '../../../repositories/user-repository';
import { UserProfile, Session, Claims } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next';

async function saveNewUser(auth0User: Claims) {
    const userRepository = new UserRepository()
    const userEntity = UserEntity.fromAuth0(auth0User)
    userRepository.saveNewUser(userEntity)
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
