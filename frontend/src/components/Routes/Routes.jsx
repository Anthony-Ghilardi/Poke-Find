import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import LoginHome from "../Auth/Login";
import Callback from "../Auth/Callback";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <LoginHome />,
    },
    {
        path: "/auth/callback",
        element: <Callback />,
    },
]);

export default routes;
