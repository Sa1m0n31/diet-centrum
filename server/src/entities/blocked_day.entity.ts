import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('blocked_day')
export class BlockedDay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: number;

    @Column()
    month: number;

    @Column()
    year: number;
}
