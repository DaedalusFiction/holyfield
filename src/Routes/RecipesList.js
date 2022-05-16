import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import { db } from "../firebase";
import gyro from "../images/gyro.jpg";
const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [visibleRecipes, setVisibleRecipes] = useState([]);
    const [entree, setEntree] = useState("All");
    const [ethnicity, setEthnicity] = useState("All");

    const entrees = ["All", "Appetizer", "Main", "Dessert", "Side", "Bread"];
    const ethnicities = [
        "All",
        "American",
        "Asian",
        "German",
        "Italian",
        "Mediterranean",
        "Mexican",
        "South and Central American",
        "Other",
    ];
    useEffect(() => {
        async function fetchData() {
            const q = query(collection(db, "recipes"));

            const querySnapshot = await getDocs(q);
            let newRecipes = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                newRecipes = [...newRecipes, doc];
                setRecipes(newRecipes);
                setVisibleRecipes(newRecipes);
            });
        }
        fetchData();

        return () => {};
    }, []);

    const handleEntreeChange = (e) => {
        const newRecipes = recipes.filter(
            (item) =>
                (item.data().entree === e.target.value ||
                    e.target.value === "All") &&
                (item.data().ethnicity === ethnicity || ethnicity === "All")
        );
        setVisibleRecipes(newRecipes);
        setEntree(e.target.value);
    };
    const handleEthnicityChange = (e) => {
        const newRecipes = recipes.filter(
            (item) =>
                (item.data().ethnicity === e.target.value ||
                    e.target.value === "All") &&
                (item.data().entree === entree || entree === "All")
        );
        setVisibleRecipes(newRecipes);
        setEthnicity(e.target.value);
    };

    return (
        <>
            <Banner photo={gyro} title="Recipes" />
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "2em",
                        marginBottom: "3rem",
                    }}
                >
                    <Box sx={{ width: "300px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="entrees-label">Entree</InputLabel>
                            <Select
                                labelId="entrees-label"
                                id="entrees"
                                value={entree}
                                label="Category"
                                onChange={handleEntreeChange}
                            >
                                {entrees.map((item) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: "300px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="ethnicity-label">
                                Ethnicity
                            </InputLabel>
                            <Select
                                labelId="ethnicity-label"
                                id="ethnicity"
                                value={ethnicity}
                                label="Ethnicity"
                                onChange={handleEthnicityChange}
                            >
                                {ethnicities.map((item) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {visibleRecipes.map((recipe) => {
                    return (
                        <Box sx={{ margin: ".5em 0" }}>
                            <Link to={`/recipes/${recipe.id}`}>
                                {recipe.data().name}
                            </Link>
                        </Box>
                    );
                })}
                <Outlet />
            </Container>
        </>
    );
};

export default Recipes;
