import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Box
            sx={{
                backgroundColor: "var(--bg-secondary)",
                boxShadow: "0 4px 2px -2px gray",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1em 0",
                }}
            >
                <Link to="/">
                    <Typography sx={{ color: "var(--bg-primary)" }}>
                        HF
                    </Typography>
                </Link>
                <Box sx={{ display: "flex", gap: "3em" }}>
                    <Link to="photos">
                        <Typography sx={{ color: "var(--bg-primary)" }}>
                            PHOTOS
                        </Typography>
                    </Link>
                    <Link to="recipes-list">
                        <Typography sx={{ color: "var(--bg-primary)" }}>
                            RECIPES
                        </Typography>
                    </Link>
                    <Link to="upload">
                        <Typography sx={{ color: "var(--bg-primary)" }}>
                            UPLOAD
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
