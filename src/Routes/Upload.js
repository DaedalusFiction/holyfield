import { Box, Button, Container, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import UploadPhoto from "../components/UploadPhoto";
import UploadRecipe from "../components/UploadRecipe";
import { auth, db, provider } from "../firebase";
import useLogin from "../hooks/useLogin";
import login from "../scripts/login.js";

const Upload = () => {
    const [currentUser, setCurrentUser] = useState(null);
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
            <Typography variant="h2">Upload Photos and Recipes</Typography>
            {/* {user && <Typography variant="h2">{user.data().admin}</Typography>} */}
            {!isAdmin && (
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ margin: "1em 0" }}
                >
                    Log In with Google
                </Button>
            )}
            <br />
            {isAdmin && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5em",
                    }}
                >
                    <Button onClick={handleShowUploadPhoto}>
                        Upload Photo
                    </Button>
                    <Button onClick={handleShowUploadRecipe}>
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
