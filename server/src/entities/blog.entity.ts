import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    excerpt: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @Column()
    category: number;
}
