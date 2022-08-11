import {getUserInfo} from "../api/dbApi";

export function handleLoginSuccess(data, setGlobalToken, setUser, navigate) {
    if (data.data.code === "000000") {

        let token = data.data.data.token
        let expiredTime = data.data.data.expiredTime
        console.log("进入设置", token, expiredTime)
        let key = {
            token: token, expiredTime: expiredTime
        }
        setGlobalToken(JSON.stringify(key))
        console.log("key", key)
        getUserInfo({}, key)
            .then(r =>{
                setUser(r.data.data)
                return r
            })
            .catch(e => {

            })

        navigate("/header/dashboard")
    }
}
