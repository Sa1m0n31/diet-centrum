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
            .replace(/ /g, '-')
            .replace(/ą/g, 'a')
            .replace(/ć/g, 'c')
            .replace(/ę/g, 'e')
            .replace(/ł/g, 'l')
            .replace(/ó/g, 'o')
            .replace(/ś/g, 's')
            .replace(/ż/g, 'z')
            .replace(/ź/g, 'z')
            .replace(/ń/g, 'n');
    }

    async addProduct(files, body) {
        const { type, title, short_description, long_description, points, price } = body;

        const slug = this.createSlug(title);

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
