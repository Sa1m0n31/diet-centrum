import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('day')
export class Day {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column('decimal', { precision: 6, scale: 2 })
    price: number;

    @Column()
    purchase_limit: number;
}
