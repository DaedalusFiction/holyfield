import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { primaryTheme } from "./themes/primaryTheme.js";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={primaryTheme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
