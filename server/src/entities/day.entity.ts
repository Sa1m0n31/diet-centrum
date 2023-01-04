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

    @Column()
    price: string;

    @Column()
    purchase_limit: number;
}
