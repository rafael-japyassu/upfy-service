import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: true
  })
  active: boolean;

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}
