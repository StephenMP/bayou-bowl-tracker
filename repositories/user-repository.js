import { UserEntity } from 'entities/user-entity'
import { getRedisContext } from '../util/redis'

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

    async getAllUsers() {
        const redis = getRedisContext()
        try {
            const userEntities = []
            const userKeys = await redis.keys('user-*')
            const usersJson = await redis.mget(userKeys)

            for (var i = 0; i < usersJson.length; i++) {
                const userEntity = JSON.parse(usersJson[i])
                userEntities.push(Object.assign(new UserEntity(), userEntity))
            }

            return userEntities
        }
        catch (error) {
            console.log(error)
        }
        finally {
            redis.quit()
        }
    }
}