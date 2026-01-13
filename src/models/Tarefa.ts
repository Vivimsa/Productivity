import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm'
import {User} from "./User";
import {IsDateString, IsOptional, MinDate} from "class-validator";
import {Meta} from "./Meta"

@Entity('tarefas')
export class Tarefa{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    titulo!:string

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    descricao?:string | null

    @Column({type:'datetime'})
    @IsOptional()
    @IsDateString()
    concluida_em?:string | null

    @Column({type:'date'})
    @IsOptional()
    @IsDateString({}, { message: 'data_inicio deve ser uma data ISO válida (yyyy-MM-dd)' })
    data_expiracao?:string | null

    @Column({default:'a_fazer'})
    status!: string

    @CreateDateColumn({name:'created_at'})
    created_at!:Date;

    @UpdateDateColumn({name:'updated_at'})
    updated_at!:Date;

    @DeleteDateColumn({name: 'deleted_at'})
    deleted_at!: Date | null

    @ManyToOne(() => Meta,(meta) => meta.tarefa,{onDelete:'CASCADE'})
    @JoinColumn({name: 'meta_id'})
    meta!:Meta

    @ManyToOne(() => User,(user)=> user.tarefa,{onDelete:'CASCADE'})
    user!:User
}





