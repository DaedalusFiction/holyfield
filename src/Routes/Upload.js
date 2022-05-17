import { Box, Button, Container, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";

import React, { useState } from "react";
import UploadPhoto from "../components/UploadPhoto";
import UploadRecipe from "../components/UploadRecipe";
import { db } from "../firebase";
import login from "../scripts/login.js";

const Upload = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [showUploadRecipe, setShowUploadRecipe] = useState(false);

    const handleLogin = async () => {
        const user = await login();
        const userRef = doc(db, "users", user.uid);
        const task = await getDoc(userRef).then((response) => {
            setIsAdmin(response.data().admin);
        });
    };

    const handleShowUploadPhoto = () => {
        setShowUploadPhoto(!showUploadPhoto);
    };
    const handleShowUploadRecipe = () => {
        setShowUploadRecipe(!showUploadRecipe);
    };
    return (
        <Container sx={{ marginTop: "3em", marginBottom: "3em" }}>
            <Typography
                variant="h2"
                sx={{ fontSize: "clamp(3rem, 6vw, 10.5rem)" }}
            >
                Upload Photos and Recipes
            </Typography>
            {/* {user && <Typography variant="h2">{user.data().admin}</Typography>} */}
            {!isAdmin && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8em 0 13em 0",
                    }}
                >
                    <Button variant="contained" onClick={handleLogin}>
                        Log In with Google
                    </Button>
                </Box>
            )}
            <br />
            {isAdmin && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "3em",
                    }}
                >
                    <Button variant="contained" onClick={handleShowUploadPhoto}>
                        Upload Photo
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleShowUploadRecipe}
                    >
                        Upload Recipe
                    </Button>
                </Box>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1em",
                    margin: "3em 0",
                }}
            >
                {isAdmin && showUploadPhoto && (
                    <Box>
                        <Typography variant="h2">Upload Photo</Typography>

                        <UploadPhoto />
                    </Box>
                )}
                {isAdmin && showUploadRecipe && (
                    <Box>
                        <Typography variant="h2">Upload Recipe</Typography>

                        <UploadRecipe />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Upload;
