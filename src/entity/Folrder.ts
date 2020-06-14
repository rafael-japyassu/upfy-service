import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { FileUpload } from "./FileUpload";

@Entity()
export class Folder {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @OneToMany(type => FileUpload, fileUpload => fileUpload.folder)
    files: FileUpload[];

    @CreateDateColumn({
        name: 'create_at'
    })
    createAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

}