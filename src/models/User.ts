import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany
} from 'typeorm'
import bcrypt from 'bcrypt'
import {Meta} from "./Meta";
import {Tarefa} from "./Tarefa";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => Meta,(meta) => meta.user,{onDelete:'CASCADE'})
    metas!:Meta[]

    @OneToMany(() => Tarefa,(tarefa) => tarefa.user,{onDelete:'CASCADE'})
    tarefa!: Tarefa[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}