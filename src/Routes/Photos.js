import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from "@mui/material";
import useGetPhotos from "../hooks/useGetPhotos";
import Banner from "../components/Banner";
import grandparents from "../images/grandparents.jpg";

const Photos = () => {
    const [category, setCategory] = useState("All");
    const [lastVisible, setLastVisible] = useState(false);
    let [photos, snap] = useGetPhotos(category, lastVisible);
    const categories = [
        "All",
        "The Farm",
        "Food",
        "Family",
        "Animals",
        "Holidays",
        "Projects",
        "Misc",
    ];

    useEffect(() => {
        return () => {};
    }, []);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setLastVisible(false);
    };

    const loadMorePhotos = () => {
        setLastVisible(snap);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Banner photo={grandparents} title="Photos" />
            <Container maxWidth="xl">
                <div className="photos">
                    <Box
                        sx={{
                            minWidth: 120,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="category-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-dropdown"
                                value={category}
                                label="Category"
                                onChange={handleCategoryChange}
                            >
                                {categories.map((category) => {
                                    return (
                                        <MenuItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
                            <FormControl
                                sx={{
                                    margin: "0 3rem",
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <FormLabel
                                    sx={{ fontSize: "2rem" }}
                                    id="categories-label"
                                >
                                    Category
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="categories-label"
                                    name="categories"
                                    defaultValue="All"
                                    onChange={handleCategoryChange}
                                >
                                    {categories &&
                                        categories.map((category) => {
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
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <div className="gallery">
                                {photos &&
                                    photos.map((photo, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="modal-image-container"
                                            >
                                                <ModalImage
                                                    className="gallery-photo"
                                                    small={photo.URL}
                                                    medium={photo.URL}
                                                    alt={photo.comment}
                                                />
                                                <Typography
                                                    // variant="p"
                                                    sx={{
                                                        color: "var(--fc-light)",
                                                        fontSize: ".9em",
                                                        lineHeight: "1.2em",
                                                        padding: "0 .5em",
                                                        fontstyle: "italic",
                                                    }}
                                                >
                                                    {photo.comment}
                                                </Typography>
                                            </div>
                                        );
                                    })}
                            </div>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            onClick={loadMorePhotos}
                            sx={{ margin: "2rem" }}
                        >
                            Next Page
                        </Button>
                    </Box>
                </div>
            </Container>
        </>
    );
};
export default Photos;
