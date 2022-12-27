import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {
    }

    createSlug(title: string) {
        return title
            .toLowerCase()
            .replace(' ', '-')
            .replace('ą', 'a')
            .replace('ć', '')
            .replace('ę', '')
            .replace('ł', '')
            .replace('ó', '')
            .replace('ś', '')
            .replace('ż', '')
            .replace('ź', '')
            .replace('ń', '');
    }

    async addProduct(files, body) {
        const { type, title, short_description, long_description, points, price } = body;

        const slug = this.createSlug(title);

        console.log(long_description);

        return this.productRepository.save({
            type,
            title,
            slug,
            short_description,
            long_description,
            points,
            price,
            image: files.image[0]?.path
        });
    }

    async updateProduct(files, body) {
        const { id, type, title, short_description, long_description, points, price, image } = body;

        const slug = this.createSlug(title);

        return this.productRepository
            .createQueryBuilder()
            .update({
                type, title, slug, short_description, long_description, points, price,
                image: files?.image ? files.image[0]?.path : image
            })
            .where({
                id
            })
            .execute();
    }

    async getAllProducts() {
        return this.productRepository.find();
    }

    async getProductBySlug(slug: string, type: number) {
        return this.productRepository.findOneBy({
            slug,
            type
        });
    }

    async getProductById(id: number) {
        return this.productRepository.findOneBy({
            id
        });
    }

    async deleteProduct(id: number) {
        return this.productRepository.delete({
           id
        });
    }
}
