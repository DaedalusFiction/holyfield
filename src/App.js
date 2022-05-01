import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Routes/Home";
import Layout from "./Routes/Layout";
import Photos from "./Routes/Photos";
import Recipes from "./Routes/Recipes";
import Upload from "./Routes/Upload";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="photos" element={<Photos />} />
                <Route path="recipes" element={<Recipes />} />
                <Route path="upload" element={<Upload />} />
            </Route>
        </Routes>
    );
}

export default App;
