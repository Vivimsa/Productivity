import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm'
import {User} from "./User";
import {IsDateString, MinDate} from "class-validator";
import {Type} from "class-transformer";

@Entity()
export class Meta{
    @PrimaryGeneratedColumn()
    metaId!:number

    @Column()
    descricao!:string

    @Column({type:'date'})
    @IsDateString({}, { message: 'data_inicio deve ser uma data ISO válida (yyyy-MM-dd)' })
    data_inicio!:string

    @Column({type:'date'})
    @IsDateString({}, { message: 'data_fim deve ser uma data ISO válida (yyyy-MM-dd)' })
    data_fim!:string

    @ManyToOne(() => User,(user) => user.metas,{onDelete:'CASCADE'})
    user!:User
}





