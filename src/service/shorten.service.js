
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BACKEND

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
        return {}
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
