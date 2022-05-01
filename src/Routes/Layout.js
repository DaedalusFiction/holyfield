import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
    return (
        <Box>
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default Layout;
