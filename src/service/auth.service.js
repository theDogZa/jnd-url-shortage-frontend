import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/v1/'

export const register = async (res) => {

    let url = API_URL + 'register/'
    const result = await axios({
        method: "post",
        url: url,
        data: {
            username: res.username,
            email: res.email,
            password: res.password,
            ip: res.ip,
        },
        headers: { "Content-Type": "multipart/form-data"},
    })
    .then(function (response) {
        return response
    })
    .catch(function (response) {
        console.log(response);
    });

    return result.data
}

export const login = async (res) => {

    let url = API_URL + 'login'

    const result = await axios({
        method: "post",
        url: url,
        data: {
            username: res.username,
            password: res.password,
        },
        headers: { "Content-Type": "multipart/form-data"},
    })
    .then(function (response) {
        return response
    })
    .catch(function (response) {
        console.log(response);
    });

    return result.data
}

export const logout = async (res) => { 
    sessionStorage.removeItem('token');
    sessionStorage.clear();
}