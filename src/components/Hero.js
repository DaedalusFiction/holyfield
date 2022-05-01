import { Box, Container, Typography } from "@mui/material";
import React from "react";
import farm from "../images/theFarm.jpeg";

const Hero = () => {
    return (
        <Box
            sx={{
                // backgroundImage: `url(${earth})`,
                backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(23, 23, 23, 0.5)),
  url(${farm})`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                padding: "20vw 0",
            }}
        >
            <Container maxWidth="xl">
                <Typography
                    variant="h1"
                    sx={{ textAlign: "center", color: "white" }}
                >
                    Holyfield Farms
                </Typography>
            </Container>
        </Box>
    );
};

export default Hero;
