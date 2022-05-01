import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import UploadPhoto from "../components/UploadPhoto";
import useLogin from "../hooks/useLogin";

const Upload = () => {
    const [user, isAdmin] = useLogin();
    const handleLogin = () => {
        console.log(isAdmin);
    };
    return (
        <Container sx={{ marginTop: "3em", marginBottom: "3em" }}>
            <Typography variant="h2">Upload Photos</Typography>
            {/* {user && <Typography variant="h2">{user.data().admin}</Typography>} */}
            <Button onClick={handleLogin}>Log In with Google</Button>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "3em 0",
                }}
            >
                <UploadPhoto />
            </Box>
        </Container>
    );
};

export default Upload;
