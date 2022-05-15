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

const UploadPhoto = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [comment, setComment] = useState("");
    const [category, setCategory] = useState("All");
    const categories = [
        "The Farm",
        "Food",
        "Family",
        "Animals",
        "Holidays",
        "Projects",
        "Misc",
    ];

    const handlePhotoChange = (e) => {
        var file = e.target.files[0];
        setSelectedPhoto(file);

        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                document.getElementById("preview").src = e.target.result;
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

    const uploadPhoto = async (e) => {
        //uploads photo to firebase storage and form data to firestore database
        e.preventDefault();
        const storageRef = ref(storage, selectedPhoto.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedPhoto);

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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDoc(doc(db, "photos", selectedPhoto.name), {
                        URL: downloadURL,
                        uploaded: Timestamp.fromDate(new Date(Date.now())),
                        comment: comment,
                        category: category,
                        createdAt: Date.now(),
                    });
                });
                setSelectedPhoto(null);
                setComment("");
                setIsPhotoUploaded(true);
                document.getElementById("photoInput").value = null;
            }
        );
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
            <input
                type="file"
                id="photoInput"
                // value={selectedPhoto}
                onChange={handlePhotoChange}
                sx={{ width: "fit-content" }}
                accept="image/png, image/jpeg"
            />
            {selectedPhoto && (
                <img
                    id="preview"
                    src={selectedPhoto}
                    alt="selected"
                    style={{ maxWidth: "15rem", height: "auto" }}
                />
            )}
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
                <FormLabel id="categories-label">Category</FormLabel>
                <RadioGroup
                    aria-labelledby="categories-label"
                    defaultValue="All"
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
            {selectedPhoto && (
                <Button
                    variant="contained"
                    onClick={uploadPhoto}
                    sx={{ width: "fit-content" }}
                >
                    Submit Photo
                </Button>
            )}
            {uploadProgress > 0 && (
                <Typography>{uploadProgress.toFixed(2)}%</Typography>
            )}
            {isPhotoUploaded && <Typography>Photo Uploaded!</Typography>}
        </Box>
    );
};

export default UploadPhoto;
