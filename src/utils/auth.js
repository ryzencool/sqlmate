import {getUserInfo} from "../api/dbApi";
import toast from "react-hot-toast";

export function handleLoginSuccess(data, setGlobalToken, setUser, navigate) {
    if (data.data.code === "000000") {
        getUserInfo({})
            .then(r =>{
                setUser(r.data.data)
                return r
            })
            .catch(e => {

            })

        navigate("/header/dashboard/myProject")
    }

    if (data.data.code === "000003") {
        toast.error("当前手机用户已被注册")
        return
    }
}
