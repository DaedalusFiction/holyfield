import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import Banner from "../components/Banner";
import { db } from "../firebase";
import gyro from "../images/gyro.jpg";
const Recipes = () => {
    useEffect(() => {
        const q = query(collection(db, "recipies"));

        const querySnapshot = getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

        return () => {};
    }, []);

    return (
        <>
            <Banner photo={gyro} title="Recipes" />
        </>
    );
};

export default Recipes;
