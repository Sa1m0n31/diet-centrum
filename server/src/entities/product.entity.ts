import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    title: string;

    @Column()
    short_description: string;

    @Column()
    long_description: string;

    @Column()
    points: string;

    @Column()
    image: string;

    @Column()
    price: number;
}
