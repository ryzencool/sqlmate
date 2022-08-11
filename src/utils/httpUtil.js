import axios from 'axios'
import {host} from "../config/hostConfig";
import toast from "react-hot-toast";
import {currentTime} from "./dateUtil";

const onSuccess = resp => {
    // filter some business exception
    return resp
}

const onError = error => {
    // optional catch errors and add additional logging hear
    return error
}


export function get(url, params = {}, auth) {

    let value = "";
    let ps = Object.entries(params).map(it => {
        return it[0] + "=" + it[1]
    });
    if (ps.length > 0) {
        value = "?" + ps.join("&")
    }
    console.log("get", auth)
    let headers = {}
    if (!!auth) {
        let time = currentTime()
        // if (auth.expiredTime / 1000 < time ) {
        //     toast("当前登录凭证已到期，请重新登录", {
        //         position: 'top',
        //         duration: 5000
        //     })
        //     return;
        // }
        headers = {"Authorization": "bearer " + auth.token};
    }

    return axios({
        method: 'get',
        url: `${host}${url}${value}`,
        headers: headers

    }).then(onSuccess).catch(onError)
}


export function post(url, params = {}, header = {}) {

    return axios.post(`${host}${url}`, params).then(onSuccess).catch(onError)
}
