import axios from "axios";

const updateContent = (data) => {
    return axios.patch('/admin/updateContent', data);
}

const getContent = () => {
    return axios.get('/admin/getContent');
}

const sendContactForm = (name, email, phoneNumber, message) => {
    return axios.post('/admin/sendContactForm', {
        name, email, phoneNumber, message
    });
}

export { updateContent, getContent, sendContactForm }
