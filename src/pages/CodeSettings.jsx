import React from 'react'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";


export default function CodeSettings() {

const navigate = useNavigate()
    return <div>
        <Button onClick={() => navigate("/header/dashboard/codeTemplateEdit") }>创建模版</Button>

        <div>
            <div>

            </div>
        </div>
    </div>
}
