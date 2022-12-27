import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('discount_code')
export class DiscountCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column()
    discount_type: number;

    @Column()
    discount_value: number;
}
