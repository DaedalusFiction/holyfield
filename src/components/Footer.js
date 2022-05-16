import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const navigateToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <Box
            sx={{
                backgroundColor: "var(--bg-secondary)",
            }}
        >
            <Container
                sx={{
                    padding: "1em 0",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "3em",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link to="/" onClick={navigateToTop}>
                        <Typography sx={{ color: "var(--bg-primary)" }}>
                            HOME
                        </Typography>
                    </Link>
                    <button className="back-to-top" onClick={navigateToTop}>
                        Back to Top
                    </button>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
