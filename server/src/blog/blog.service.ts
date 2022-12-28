import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Blog} from "../entities/blog.entity";
import {Repository} from "typeorm";
import {BlogCategory} from "../entities/blog_category.entity";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(BlogCategory)
        private readonly blogCategoryRepository: Repository<BlogCategory>
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

    async getAllArticles() {
        return this.blogRepository.find();
    }

    async getArticleById(id) {
        return this.blogRepository.findOneBy({
            id
        });
    }

    async getArticleBySlug(slug) {
        return this.blogRepository.findOneBy({
            slug
        });
    }

    async addArticle(body, files) {
        const { title, excerpt, content, categories } = body;

        return this.blogRepository.save({
            title,
            slug: this.createSlug(title),
            excerpt,
            content,
            categories,
            image: files.image[0]?.path,
            created_at: new Date()
        });
    }

    async updateArticle(body, files) {
        const { id, title, excerpt, content, categories, image } = body;

        return this.blogRepository.createQueryBuilder()
            .update({
                title,
                slug: this.createSlug(title),
                excerpt,
                content,
                categories,
                image: files?.image ? files.image[0]?.path : image
            })
            .where({
                id
            })
            .execute();
    }

    async deleteArticle(id) {
        return this.blogRepository.delete({
            id
        });
    }

    async getAllCategories() {
        return this.blogCategoryRepository.find();
    }

    async addCategory(name) {
        return this.blogCategoryRepository.save({
            name
        });
    }

    async deleteCategory(id) {
        return this.blogCategoryRepository.delete({
            id
        });
    }

    async updateCategory(id, name) {
        return this.blogCategoryRepository.createQueryBuilder()
            .update({
                name
            })
            .where({
                id
            })
            .execute();
    }
}
