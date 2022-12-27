import axios from "axios";

const getAllDiscountCodes = () => {
    return axios.get('/code/getAll');
}

const addDiscountCode = (code, discountType, discountValue) => {
    return axios.post('/code/add', {
        code, discountType, discountValue
    });
}

const updateDiscountCode = (id, code, discountType, discountValue) => {
    return axios.patch('/code/update', {
        id, code, discountType, discountValue
    });
}

const deleteDiscountCode = (id) => {
    return axios.delete(`/code/delete/${id}`);
}

const verifyDiscountCode = (code) => {
    return axios.get(`/code/verify/${code}`);
}

export { getAllDiscountCodes, addDiscountCode,
    updateDiscountCode, deleteDiscountCode, verifyDiscountCode }
