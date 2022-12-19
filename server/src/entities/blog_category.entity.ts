import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('blog_category')
export class BlogCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
