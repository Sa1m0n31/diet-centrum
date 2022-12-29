import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cart: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    street: string;

    @Column()
    building: string;

    @Column()
    flat: string;

    @Column()
    postal_code: string;

    @Column()
    city: string;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @Column()
    email_to_send: string;

    @Column()
    purchase_date: Date;

    @Column()
    send_date: string;

    @Column()
    invoice: string;

    @Column()
    paper_version: boolean;

    @Column()
    discount_code: string;

    @Column()
    discount_value: number;

    @Column()
    payment_id: string;

    @Column()
    payment_status: string;

    @Column()
    attachment: string;

    @Column()
    sum: number;
}
