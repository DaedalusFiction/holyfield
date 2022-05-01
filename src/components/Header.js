import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box sx={{ backgroundColor: "#080f10" }}>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1em 0",
                }}
            >
                <Link to="/">
                    <Typography sx={{ color: "white" }}>HF</Typography>
                </Link>
                <Box sx={{ display: "flex", gap: "3em" }}>
                    <Link to="photos">
                        <Typography sx={{ color: "white" }}>PHOTOS</Typography>
                    </Link>
                    <Link to="recipes">
                        <Typography sx={{ color: "white" }}>RECIPES</Typography>
                    </Link>
                    <Link to="upload">
                        <Typography sx={{ color: "white" }}>UPLOAD</Typography>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
