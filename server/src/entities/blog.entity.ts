import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    excerpt: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @Column()
    categories: string;

    @Column()
    created_at: Date;
}
