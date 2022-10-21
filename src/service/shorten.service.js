
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/v1/'

export const getShorten = async (res) => { 

    let url = API_URL + 'url-shorten'

    const result = await axios({
        method: "post",
        url: url,
        data: {
            url: res.url,
            ip: res.ip,
            token: res.token,
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

export const getOriginal = async (res) => { 

    let url = API_URL + 'get-original-url'

    const result = await axios({
        method: "post",
        url: url,
        data: {
            url: res.url,
            ip: res.ip
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
