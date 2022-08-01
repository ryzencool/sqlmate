import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

const CustomRouter = () => {
    return (
        <Routes>
            <Route path="/index" element={<Index/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default CustomRouter;
