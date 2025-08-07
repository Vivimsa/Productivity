import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm'
import {User} from "./User";
import {IsDateString, MinDate} from "class-validator";
import {Type} from "class-transformer";
import {Meta} from "./Meta"

@Entity()
export class Tarefa{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    descricao!:string

    @Column()
    registro_tempo!:string

    @Column({type:'date'})
    @IsDateString({}, { message: 'data_inicio deve ser uma data ISO válida (yyyy-MM-dd)' })
    data_inicio!:string

    @Column({type:'date'})
    @IsDateString({}, { message: 'data_fim deve ser uma data ISO válida (yyyy-MM-dd)' })
    data_fim!:string

    @ManyToOne(() => Meta,(meta) => meta.tarefa,{onDelete:'CASCADE'})
    meta!:Meta

    @ManyToOne(() => User,(user)=> user.tarefa,{onDelete:'CASCADE'})
    user!:User
}





