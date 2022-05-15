import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebase";

const UploadRecipe = () => {
    const [selectedRecipies, setSelectedRecipies] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isRecipeUploaded, setIsRecipeUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [recipeName, setRecipeName] = useState("");
    const [comment, setComment] = useState("");
    const [category, setCategory] = useState("All");
    const [ethnicity, setEthnicity] = useState("American");
    const categories = ["Appetizer", "Entree", "Dessert", "Side", "Bread"];
    const ethnicities = [
        "American",
        "Asian",
        "German",
        "Italian",
        "Mediterranean",
        "Mexican",
        "South and Central American",
        "Other",
    ];

    const handleRecipeChange = (e) => {
        setSelectedRecipies([...selectedRecipies, e.target.files[0]]);

        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                setPreviews([...previews, e.target.result]);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleEthnicityChange = (e) => {
        setEthnicity(e.target.value);
    };
    const handleRecipeNameChange = (e) => {
        setRecipeName(e.target.value);
    };

    const uploadRecipe = async (e) => {
        //uploads Recipe to firebase storage and form data to firestore database
        e.preventDefault();
        var downloadURLs = [];
        selectedRecipies.forEach((recipe) => {
            console.log(recipe.name);
            const storageRef = ref(storage, recipeName);
            const uploadTask = uploadBytesResumable(storageRef, recipe.name);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //to show upload progress as percentage
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // setUploadProgress(progress);
                },
                (error) => {
                    // setUploadError(true);
                },
                () => {
                    // creates firestore database entry
                    // setUploadProgress(0);
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            downloadURLs = [...downloadURLs, downloadURL];
                            if (
                                downloadURLs.length >= selectedRecipies.length
                            ) {
                                setDoc(doc(db, "recipes", recipeName), {
                                    URLs: downloadURLs,
                                    uploaded: Timestamp.fromDate(
                                        new Date(Date.now())
                                    ),
                                    comment: comment,
                                    category: category,
                                    ethnicity: ethnicity,
                                    createdAt: Date.now(),
                                });
                                setSelectedRecipies([]);
                                setPreviews([]);
                                setRecipeName("");

                                setComment("");
                                setIsRecipeUploaded(true);
                                document.getElementById("recipeInput").value =
                                    null;
                            }
                        }
                    );
                }
            );
        });
    };

    return (
        <Box
            sx={{
                padding: "1em",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
            }}
        >
            <Box sx={{ display: "flex", gap: "1rem" }}>
                {previews &&
                    previews.map((preview, index) => {
                        return (
                            <>
                                <Typography>#{index + 1}</Typography>
                                <img
                                    id="preview"
                                    src={preview}
                                    alt="selected"
                                    style={{
                                        maxWidth: "15rem",
                                        height: "auto",
                                    }}
                                />
                            </>
                        );
                    })}
            </Box>
            <Typography variant="h6">Recipe Name:</Typography>
            <TextField
                id="updateName"
                value={recipeName}
                onChange={handleRecipeNameChange}
                sx={{
                    minWidth: "45ch",
                    maxWidth: "55ch",
                    // margin: "1em 0 2em 0",
                }}
            />
            <Typography variant="h6">Enter Comment</Typography>
            <TextField
                id="updateText"
                multiline
                minRows={2}
                value={comment}
                onChange={handleCommentChange}
                sx={{
                    minWidth: "45ch",
                    maxWidth: "55ch",
                    // margin: "1em 0 2em 0",
                }}
            />
            <FormControl>
                <FormLabel id="categories-label">Category:</FormLabel>
                <RadioGroup
                    aria-labelledby="categories-label"
                    defaultValue="Appetizer"
                    name="radio-buttons-group"
                    onChange={handleCategoryChange}
                    row
                >
                    {categories.map((category) => {
                        return (
                            <FormControlLabel
                                key={category}
                                value={category}
                                control={<Radio />}
                                label={category}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="ethnicities-label">Ethnicity:</FormLabel>
                <RadioGroup
                    aria-labelledby="Ethnicities-label"
                    defaultValue="American"
                    name="ethnicities-buttons-group"
                    onChange={handleEthnicityChange}
                    row
                >
                    {ethnicities.map((ethnicity) => {
                        return (
                            <FormControlLabel
                                key={ethnicity}
                                value={ethnicity}
                                control={<Radio />}
                                label={ethnicity}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <Box sx={{ margin: "1em 0" }}>
                <input
                    type="file"
                    id="recipeInput"
                    // value={selectedRecipe}
                    onChange={handleRecipeChange}
                    sx={{ width: "fit-content" }}
                    accept="image/png, image/jpeg"
                />
            </Box>
            {selectedRecipies && (
                <Button
                    variant="contained"
                    onClick={uploadRecipe}
                    sx={{ width: "fit-content", margin: "1em 0" }}
                >
                    Submit Recipe
                </Button>
            )}
            {uploadProgress > 0 && (
                <Typography>{uploadProgress.toFixed(2)}%</Typography>
            )}
            {isRecipeUploaded && <Typography>Recipe Uploaded!</Typography>}
        </Box>
    );
};

export default UploadRecipe;
