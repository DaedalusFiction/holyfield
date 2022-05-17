import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Banner = ({ photo, title }) => {
    return (
        <Box
            sx={{
                // backgroundImage: `url(${earth})`,
                backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(23, 23, 23, 0.5)),
  url(${photo})`,
                // backgroundAttachment: "fixed",
                backgroundSize: "cover",
                padding: "5vw 0",
                marginBottom: "3rem",
            }}
        >
            <Container maxWidth="xl">
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center",
                        color: "white",
                        fontSize: "clamp(3rem, 10vw, 12rem)",
                    }}
                >
                    {title}
                </Typography>
            </Container>
        </Box>
    );
};

export default Banner;
