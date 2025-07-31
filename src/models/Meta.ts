import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm'
import {User} from "./User";

@Entity()
export class Meta{
    @PrimaryGeneratedColumn()
    metaId!:number

    @Column()
    descricao!:string

    @Column({type:'date'})
    dataInicio!:Date

    @Column({type:'date'})
    dataFim!:Date

    @ManyToOne(() => User,(user) => user.metas,{onDelete:'CASCADE'})
    user!:User
}





