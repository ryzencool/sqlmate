import axios from 'axios'
import {host} from "../config/hostConfig";

const onSuccess = resp => {
    // filter some business exception
    return resp
}

const onError = error => {
    // optional catch errors and add additional logging hear
    return error
}



export function get(url, params = {}) {
    let value = "";
    let ps = Object.entries(params).map(it => {
        return it[0] + "=" + it[1]
    });
    if (ps.length > 0) {
        value = "?" + ps.join("&")
    }


    return axios.get(`${host}${url}${value}`).then(onSuccess).catch(onError)
}

export function post(url, params = {}) {

    return axios.post(`${host}${url}`, params).then(onSuccess).catch(onError)
}
