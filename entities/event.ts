import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @Column()
  name: string

  @Column()
  startDate: number

  @Column()
  pictureUrl?: string
}