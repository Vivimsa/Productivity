import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany, DeleteDateColumn
} from 'typeorm'
import bcrypt from 'bcrypt'
import {Meta} from "./Meta";
import {Tarefa} from "./Tarefa";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column({type: 'datetime', nullable: true, name:'email_verified_at'})
    emailVerifiedAt!: Date | null

    @Column()
    password!: string

    @CreateDateColumn({name:'created_at'})
    createdAt!: Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt!: Date

    @DeleteDateColumn({name:'deleted_at'})
    deletedAt!: Date | null

    @OneToMany(() => Meta,(meta) => meta.user)
    metas!:Meta[]

    @OneToMany(() => Tarefa,(tarefa) => tarefa.user,)
    tarefa!: Tarefa[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
        if (this.email) {
            this.email = this.email.toLowerCase();
        }
    }
}