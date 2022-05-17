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
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebase";

const UploadRecipe = () => {
    const [selectedRecipies, setSelectedRecipies] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isRecipeUploaded, setIsRecipeUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [recipeName, setRecipeName] = useState("");
    const [notes, setNotes] = useState("");
    const [entree, setEntree] = useState("Appetizer");
    const [ethnicity, setEthnicity] = useState("American");
    const entrees = ["Appetizer", "Main", "Dessert", "Side", "Bread"];
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

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleEntreeChange = (e) => {
        setEntree(e.target.value);
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
            const storageRef = ref(storage, recipe.name);
            const uploadTask = uploadBytesResumable(storageRef, recipe);

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
                                addDoc(collection(db, "recipes"), {
                                    URLs: downloadURLs,
                                    uploaded: Timestamp.fromDate(
                                        new Date(Date.now())
                                    ),
                                    name: recipeName,
                                    notes: notes,
                                    entree: entree,
                                    ethnicity: ethnicity,
                                    createdAt: Date.now(),
                                });
                                setSelectedRecipies([]);
                                setPreviews([]);
                                setRecipeName("");

                                setNotes("");
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
            <Typography variant="h6">Recipe Name:</Typography>
            <TextField
                id="updateName"
                value={recipeName}
                onChange={handleRecipeNameChange}
                sx={{
                    minWidth: "35ch",
                    maxWidth: "55ch",
                    // margin: "1em 0 2em 0",
                }}
            />
            <Typography variant="h6">Enter Notes:</Typography>
            <TextField
                id="updateText"
                multiline
                minRows={2}
                value={notes}
                onChange={handleNotesChange}
                sx={{
                    minWidth: "35ch",
                    maxWidth: "55ch",
                    // margin: "1em 0 2em 0",
                }}
            />
            <FormControl>
                <FormLabel id="entrees-label">Category:</FormLabel>
                <RadioGroup
                    aria-labelledby="entrees-label"
                    defaultValue="Appetizer"
                    name="radio-buttons-group"
                    onChange={handleEntreeChange}
                    row
                >
                    {entrees.map((category) => {
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
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {previews &&
                    previews.map((preview, index) => {
                        return (
                            <Box>
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
                            </Box>
                        );
                    })}
            </Box>
            {selectedRecipies.length > 0 && (
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
