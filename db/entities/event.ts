import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 } from 'uuid'

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'bigint', nullable: true })
  startDate: number

  @Column({ type: 'varchar', nullable: true })
  pictureUrl?: string

  @BeforeInsert()
  addId() {
    this.id = v4()
  }
}