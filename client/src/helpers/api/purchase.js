import axios from "axios";

const getAllPurchases = () => {
    return axios.get('/purchase/getAll');
}

const getPurchaseById = (id) => {
    return axios.get(`/purchase/getById/${id}`);
}

const addPurchase = (userData, invoiceData, emailToSend, purchaseDate, paperVersion,
                     discountCode, discountValue, sum) => {
    const { firstName, lastName, street, building, flat, postalCode, city, phoneNumber, email } = userData;

    return axios.post('/purchase/add', {
        firstName, lastName, street, building, flat,
        postalCode, city, phoneNumber, email,
        invoice: invoiceData ? JSON.stringify(invoiceData) : null,
        emailToSend, purchaseDate, paperVersion,
        discountCode, discountValue, sum
    });
}

export { getAllPurchases, getPurchaseById, addPurchase }
