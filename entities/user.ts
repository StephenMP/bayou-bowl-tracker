import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Claims } from '@auth0/nextjs-auth0'

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @Column()
  nickname?: string

  @Column()
  name?: string

  @Column()
  picture?: string

  @Column()
  email?: string

  @Column()
  email_verified?: boolean

  @Column()
  sub?: string

  @Column()
  steam_name?: string

  @Column()
  twitch_name?: string

  @Column()
  discord_name?: string

  @Column()
  twitter_name?: string

  @Column()
  about_me?: string

  static fromAuth0(auth0User: Claims) {
    var userEntity = new UserEntity()
    Object.assign(userEntity, auth0User)
    userEntity.id = `user-${auth0User.sub.split('|')[1]}`
    return userEntity
  }
}