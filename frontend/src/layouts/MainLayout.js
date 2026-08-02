import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
const MainLayout = () => {
    return (_jsxs("div", { className: " bg-[#FBF6F0]", children: [_jsx(Header, {}), _jsx("main", { className: "", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
export default MainLayout;
