import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, RelationId
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

    @CreateDateColumn({name:'created_at'})
    created_at!:Date;

    @UpdateDateColumn({name:'updated_at'})
    updated_at!:Date;

    @DeleteDateColumn({name: 'deleted_at'})
    deleted_at!: Date | null

    @ManyToOne(() => User,(user) => user.metas,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user!:User

    @OneToMany(() => Tarefa,(tarefa) => tarefa.meta, {onDelete:'CASCADE'})
    tarefa!:Tarefa
}





