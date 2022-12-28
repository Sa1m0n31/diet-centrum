import axios from "axios";
import {convertToRaw} from "draft-js";

const getAllArticles = () => {
    return axios.get('/blog/getAll');
}

const getArticleById = (id) => {
    return axios.get(`/blog/getById/${id}`);
}

const getArticleBySlug = (slug) => {
    return axios.get(`/blog/getBySlug/${slug}`);
}

const addArticle = (title, excerpt, content, image, categories) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content ? JSON.stringify(convertToRaw(content?.getCurrentContent())) : '');
    formData.append('image', image);
    formData.append('categories', JSON.stringify(categories));

    return axios.post('/blog/add', formData, config);
}

const updateArticle = (id, title, excerpt, content, image, categories) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content ? JSON.stringify(convertToRaw(content?.getCurrentContent())) : '');
    formData.append('image', image);
    formData.append('categories', JSON.stringify(categories));

    return axios.patch('/blog/update', formData, config);
}

const deleteArticle = (id) => {
    return axios.delete(`/blog/delete/${id}`);
}

const getAllCategories = () => {
    return axios.get('/blog/getAllCategories');
}

const addCategory = (name) => {
    return axios.post('/blog/addCategory', {
        name
    });
}

const updateCategory = (id, name) => {
    return axios.patch('/blog/updateCategory', {
        id, name
    });
}

const deleteCategory = (id) => {
    return axios.delete(`/blog/deleteCategory/${id}`);
}

export { getAllArticles, getArticleById, getArticleBySlug,
    addArticle, updateArticle, deleteArticle,
    getAllCategories, addCategory, updateCategory, deleteCategory }
