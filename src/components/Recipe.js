import { Container, Grid, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import ModalImage from "react-modal-image";

const Recipe = () => {
    const [recipe, setRecipe] = useState(null);
    const params = useParams();

    useEffect(() => {
        async function getStory() {
            const storyRef = doc(db, "recipes", params.id);
            const docSnap = await getDoc(storyRef);
            if (docSnap.exists()) {
                setRecipe(docSnap);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getStory();
    }, [params.id]);

    return (
        <Container>
            {/* <Button onClick={testButton}>TEst</Button> */}
            {recipe && (
                <>
                    <Typography variant="h1" sx={{ marginTop: ".5em" }}>
                        {recipe.data().name}
                    </Typography>
                    <Typography>
                        {recipe.data().ethnicity} {recipe.data().entree}
                    </Typography>
                    <Grid container spacing={3} sx={{ margin: ".5em 0" }}>
                        {recipe.data().URLs.map((URL) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ModalImage
                                        key={URL}
                                        small={URL}
                                        large={URL}
                                        alt={recipe.data().name}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
                Notes:{" "}
            </Typography>
            <Typography
                sx={{
                    fontSize: "1.5rem",
                    maxWidth: "55ch",
                    margin: "3em 0",
                }}
            >
                {recipe && recipe.data().notes}
            </Typography>
        </Container>
    );
};

export default Recipe;
