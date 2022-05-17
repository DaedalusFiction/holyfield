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
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        gap: "3em",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "1em 0",
                    }}
                >
                    <Button onClick={navigateToTop} sx={{ color: "white" }}>
                        Back to Top
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
