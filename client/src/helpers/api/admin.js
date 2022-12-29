import axios from "axios";
import {convertToRaw} from "draft-js";

const updateContent = (data) => {
    return axios.patch('/admin/updateContent', data);
}

const updateTexts = (termsOfService, privacyPolicy) => {
    return axios.patch('/admin/updateTexts', {
        privacyPolicy: JSON.stringify(convertToRaw(privacyPolicy?.getCurrentContent())),
        termsOfService: JSON.stringify(convertToRaw(termsOfService?.getCurrentContent()))
    });
}

const getContent = () => {
    return axios.get('/admin/getContent');
}

const sendContactForm = (name, email, phoneNumber, message) => {
    return axios.post('/admin/sendContactForm', {
        name, email, phoneNumber, message
    });
}

const getBlockedDays = () => {
    return axios.get('/admin/getBlockedDays');
}

const updateBlockedDays = (days) => {
    return axios.post('/admin/updateBlockedDays', {
        days
    });
}

export { updateContent, getContent, sendContactForm, getBlockedDays, updateBlockedDays, updateTexts }
