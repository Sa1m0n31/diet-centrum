import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Content {
    @PrimaryColumn()
    field: string;

    @Column()
    value: string;
}
