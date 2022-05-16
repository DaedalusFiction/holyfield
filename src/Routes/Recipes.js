import React from "react";
import { Outlet } from "react-router-dom";

const Recipes = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Recipes;
