import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

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

    const testButton = () => {
        console.log(recipe.data().URLs);
    };
    return (
        <Container>
            {/* <Button onClick={testButton}>TEst</Button> */}
            {recipe && (
                <>
                    <Typography variant="h1" sx={{ margintop: "3em" }}>
                        {recipe.data().name}
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
                                    <img
                                        key={URL}
                                        src={URL}
                                        alt={recipe.data().name}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
            <Typography sx={{ maxWidth: "55ch" }}>
                {recipe && recipe.data().comment}
            </Typography>
        </Container>
    );
};

export default Recipe;
