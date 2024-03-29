import axios from "axios";

const getAllPurchases = () => {
    return axios.get('/purchase/getAll');
}

const getPurchaseById = (id) => {
    return axios.get(`/purchase/getById/${id}`);
}

const addPurchase = (cart, userData, invoiceData, emailToSend, sendDate, paperVersion,
                     discountCode, discountValue, sum, attachments) => {
    const { firstName, lastName, street, building, flat, postalCode, city, phoneNumber, email } = userData;

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('cart', JSON.stringify(cart));
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('street', street);
    formData.append('building', building);
    formData.append('flat', flat);
    formData.append('postalCode', postalCode);
    formData.append('city', city);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('emailToSend', emailToSend);
    formData.append('invoice', invoiceData ? JSON.stringify(invoiceData) : null);
    formData.append('sendDate', sendDate);
    formData.append('paperVersion', paperVersion);
    formData.append('discountCode', discountCode);
    formData.append('discountValue', discountValue);
    formData.append('sum', sum);

    let i = 0;
    for(const att of attachments) {
        i++;
        formData.append(`attachments${i}`, att);
    }

    return axios.post('/purchase/add', formData, config);
}

const updatePurchaseStatus = (id, status) => {
    return axios.patch('/purchase/updateStatus',  {
        id, status
    });
}

export { getAllPurchases, getPurchaseById, addPurchase, updatePurchaseStatus }
