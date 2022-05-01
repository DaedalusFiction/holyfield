import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const navigateToTop = () => {
        console.log("nagivated");
    };
    return (
        <Box sx={{ backgroundColor: "#080f10" }}>
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
                    <Link to="/">
                        <Typography sx={{ color: "white" }}>HOME</Typography>
                    </Link>
                    <Button onClick={navigateToTop} sx={{ color: "white" }}>
                        Back to Top
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
