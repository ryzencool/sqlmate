import {getUserInfo} from "../api/dbApi";

export function handleLoginSuccess(data, setGlobalToken, setUser, navigate) {
    if (data.data.code === "000000") {
        getUserInfo({})
            .then(r =>{
                setUser(r.data.data)
                return r
            })
            .catch(e => {

            })

        navigate("/header/dashboard")
    }
}
