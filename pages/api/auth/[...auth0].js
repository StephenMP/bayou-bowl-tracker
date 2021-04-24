import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { getRedisContext } from '../../../util/redis'
import { UserEntity } from 'entities/user-entity';
import Redis from 'ioredis'
import { UserRepository } from 'repositories/user-repository';

async function saveNewUser(auth0User) {
    const userRepository = new UserRepository()
    const userEntity = UserEntity.fromAuth0(auth0User)
    userRepository.saveNewUser(userEntity)
}

export default handleAuth({
    callback: async (req, res) => {
        try {
            await handleCallback(req, res, {
                afterCallback: (req, res, session, state) => {
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
