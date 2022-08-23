import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import { Provider} from 'jotai'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <App/>

            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
