import { UserEntity } from 'entities/user-entity'
import { getRedisContext, executeRedis } from '../util/redis'

export class UserRepository {
    async saveNewUser(userEntity) {
        const redis = getRedisContext()
        try {
            await redis.setnx(userEntity.id, JSON.stringify(userEntity))
        }
        catch (error) {
            console.log(error)
        }
        finally {
            redis.quit()
        }
    }

    async saveUser(userEntity) {
        const redis = getRedisContext()
        try {
            await redis.set(userEntity.id, JSON.stringify(userEntity))
        }
        catch (error) {
            console.log(error)
        }
        finally {
            redis.quit()
        }
    }

    async getUserById(id) {
        const redis = getRedisContext()
        try {
            const userJson = await redis.get(id)
            const user = JSON.parse(userJson)

            return Object.assign(new UserEntity(), user)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            redis.quit()
        }
    }
}