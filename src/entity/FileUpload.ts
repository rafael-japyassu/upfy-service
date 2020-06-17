import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm'
import { Folder } from './Folrder'

@Entity()
export class FileUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  key: string;

  @Column()
  path: string;

  @Column()
  size: string;

  @ManyToOne(type => Folder, folder => folder.files)
  folder: Folder;

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}
