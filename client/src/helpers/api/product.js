import axios from "axios";
import { convertToRaw } from 'draft-js';

const getAllProducts = () => {
    return axios.get(`/product/getAll`);
}

const getProductBySlugAndType = (slug, type) => {
    return axios.get(`/product/getBySlugAndType/${slug}/${type}`);
}

const getProductById = (id) => {
    return axios.get(`/product/getById/${id}`);
}

const addProduct = (title, price, type, shortDescription, longDescription, points, image) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    console.log(JSON.stringify(convertToRaw(longDescription?.getCurrentContent())));

    formData.append('title', title);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('short_description', shortDescription);
    formData.append('long_description', longDescription ? JSON.stringify(convertToRaw(longDescription?.getCurrentContent())) : '');
    formData.append('points', JSON.stringify(points));
    formData.append('image', image);

    return axios.post(`/product/add`, formData, config);
}

const updateProduct = (id, title, price, type, shortDescription, longDescription, points, image) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('short_description', shortDescription);
    formData.append('long_description', longDescription ? JSON.stringify(convertToRaw(longDescription?.getCurrentContent())) : '');
    formData.append('points', JSON.stringify(points));
    formData.append('image', image);

    return axios.patch(`/product/update`, formData, config);
}

const deleteProduct = (id) => {
    return axios.delete(`/product/delete/${id}`);
}

export { getAllProducts, getProductBySlugAndType, addProduct, updateProduct, getProductById, deleteProduct }
