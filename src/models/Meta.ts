import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn
} from 'typeorm'
import {User} from "./User";
import {Tarefa} from "./Tarefa"
import {IsDateString, IsInt, IsOptional, MinDate} from "class-validator";
import {Type} from "class-transformer";

@Entity('metas')
export class Meta{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    titulo!:string

    @Column()
    descricao!:string

    @Column({type:'tinyint', default:1, unsigned: true})
    @IsInt()
    prioridade!:number

    @Column({type: 'date'})
    @IsDateString({}, { message: 'data_expiracao deve ser uma data ISO válida (yyyy-MM-dd)' })
    data_expiracao!:string

    @Column({type: 'datetime', nullable: true})
    @IsOptional()
    @IsDateString()
    concluida_em?:string|null;

    @CreateDateColumn()
    created_at!:Date;

    @UpdateDateColumn()
    updated_at!:Date;

    @ManyToOne(() => User,(user) => user.metas,{onDelete:'CASCADE'})
    user!:User

    @OneToMany(() => Tarefa,(tarefa) => tarefa.meta, {onDelete:'CASCADE'})
    tarefa!:Tarefa
}





