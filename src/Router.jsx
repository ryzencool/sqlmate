import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import Favorite from "./pages/Favorite";
import Template from "./pages/Template";
import DashProject from "./pages/DashProject";
import CodeSettings from "./pages/CodeSettings";
import CodeTemplateEdit from "./pages/CodeTemplateEdit";
import PublicProject from "./pages/PublicProject";

const CustomRouter = () => {
    return (
        <Routes>
            <Route path="/index" element={<Index/>}/>
            <Route path="/header" element={<Header/>}>
                <Route path={"home/:id"} element={<Home/>}/>
                <Route path={"dashboard"} element={<Dashboard/>}>
                    <Route path={"favorite"} element={<Favorite/>}/>
                    <Route path={"pubTemplate"} element={<Template/>}/>
                    <Route path={"project"} element={<DashProject/>}/>
                    <Route path={"codeSettings"} element={<CodeSettings/>}/>
                    <Route path={"codeTemplateEdit/:id"} element={<CodeTemplateEdit/>}/>
                    <Route path={"publicProject"} element={<PublicProject/>}/>
                </Route>
            </Route>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default CustomRouter;
