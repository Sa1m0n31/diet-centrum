import axios from "axios";
import {convertToRaw} from "draft-js";
import Cookies from "universal-cookie";

const getAdminAuthHeader = () => {
    const cookies = new Cookies();
    const jwt = cookies.get('access_token_admin');
    return `Bearer ${jwt}`;
}

const authAdmin = () => {
    const cookies = new Cookies();

    return axios.post('/admin/auth', {
        username: cookies.get('username'),
        role: cookies.get('role')
    }, {
        headers: {
            Authorization: getAdminAuthHeader()
        }
    });
}

const loginAdmin = (username, password) => {
    return axios.post('/admin/login', {
        username, password
    });
}

const logoutAdmin = () => {
    const cookies = new Cookies();
    cookies.remove('access_token_admin', { path: '/' });
    cookies.remove('jwt', { path: '/' });
    cookies.remove('role', { path: '/' });
    cookies.remove('username', { path: '/' });
    window.location = '/admin';
}

const updateContent = (data) => {
    return axios.patch('/admin/updateContent', data, {
        headers: {
            Authorization: getAdminAuthHeader()
        }
    });
}

const updateTexts = (termsOfService, privacyPolicy) => {
    return axios.patch('/admin/updateTexts', {
        privacyPolicy: JSON.stringify(convertToRaw(privacyPolicy?.getCurrentContent())),
        termsOfService: JSON.stringify(convertToRaw(termsOfService?.getCurrentContent()))
    }, {
        headers: {
            Authorization: getAdminAuthHeader()
        }
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

const getDays = () => {
    return axios.get('/admin/getDays');
}

const updateDays = (days) => {
    return axios.post('/admin/updateDays', {
        days
    }, {
        headers: {
            Authorization: getAdminAuthHeader()
        }
    });
}

const updateAttachment = (attachment) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('attachment', attachment);

    return axios.patch('/admin/updateAttachment', formData, config);
}

export { updateContent, getContent, sendContactForm, getDays, updateDays,
    updateTexts, authAdmin, logoutAdmin, loginAdmin, updateAttachment }
