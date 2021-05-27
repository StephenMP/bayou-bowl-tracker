import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Claims } from '@auth0/nextjs-auth0'
import { v4 } from "uuid";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @Column({ type: 'varchar', nullable: true })
  nickname?: string

  @Column({ type: 'varchar', nullable: true })
  name?: string

  @Column({ type: 'varchar', nullable: true })
  picture?: string

  @Column({ type: 'varchar', nullable: true })
  email?: string

  @Column({ type: 'boolean', nullable: true })
  email_verified?: boolean

  @Column({ type: 'varchar', nullable: true })
  sub?: string

  @Column({ type: 'varchar', nullable: true, length: 64 })
  steam_name?: string

  @Column({ type: 'varchar', nullable: true, length: 64  })
  twitch_name?: string

  @Column({ type: 'varchar', nullable: true, length: 64 })
  discord_name?: string

  @Column({ type: 'varchar', nullable: true, length: 32 })
  twitter_name?: string

  @Column({ type: 'text', nullable: true, length: 512 })
  about_me?: string

  @BeforeInsert()
  addId() {
    this.id = v4()
  }

  static fromAuth0(auth0User: Claims) {
    var userEntity = new UserEntity()
    Object.assign(userEntity, auth0User)
    return userEntity
  }
}