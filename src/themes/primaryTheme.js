import { createTheme } from "@mui/material";

const primaryTheme = createTheme({
    palette: {
        type: "dark",
        background: {
            default: "var(--bg-primary)",
        },
        primary: {
            main: "#1e221a",
            // main: "#F3CA40",
        },
        secondary: {
            main: "#1e221a",
        },
    },
    typography: {
        h1: {
            color: "var(--fc-primary)",
            fontFamily: "var(--ff-secondary)",
            fontSize: "8rem",
        },
        h2: {
            color: "var(--fc-primary)",
            fontFamily: "var(--ff-secondary)",
        },
        h3: {
            color: "var(--fc-primary)",
            fontFamily: "var(--ff-secondary)",
        },
        h4: {
            // fontFamily: "var(--ff-secondary)",
        },
        h5: {
            color: "var(--fc-primary)",
            fontFamily: "var(--ff-secondary)",
            fontWeight: "bold",
        },
        h6: {
            color: "var(--fc-primary)",

            fontSize: "1.2rem",
        },
        p: {
            color: "var(--fc-primary)",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                // root: {
                //     fontSize: "1.2rem",
                //     background: "var(--bg-button)",
                //     border: 0,
                //     padding: ".6em 1.5em",
                //     textDecoration: "none",
                //     color: "var(--fc-primary)",
                //     "&:hover": {
                //         transition: "300ms",
                //     },
                // },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: "var(--fc-secondary)",

                    "&.Mui-checked": {
                        color: "var(--fc-primary)",
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#1e221a",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                },
                "&$focused": {
                    color: "#1e221a",
                },
                "&$active": {
                    color: "#1e221a",
                },
            },
        },
    },
});

export { primaryTheme };
