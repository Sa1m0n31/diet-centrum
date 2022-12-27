import axios from "axios";

const addOrder = (userData, invoiceData, attachment) => {
    return axios.post('/order/add', {
        userData, invoiceData
    });
}

const getAllOrders = () => {
    return axios.get('/order/getAll');
}

const getOrderDetails = (id) => {
    return axios.get(`/order/get/${id}`);
}

export { addOrder, getAllOrders, getOrderDetails }
