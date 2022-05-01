import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function useGetPhotos(maxNumber) {
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        async function getPhotos() {
            const q = query(
                collection(db, "photos"),
                orderBy("createdAt", "desc"),
                limit(maxNumber)
            );

            const docsSnap = await getDocs(q);
            let newPhotos = [];
            docsSnap.docs.forEach((doc, index) => {
                newPhotos = [...newPhotos, doc.data()];
                // console.log(doc.data());
            });
            setPhotos(newPhotos);
        }

        getPhotos();
    }, [maxNumber]);

    return photos;
}

export default useGetPhotos;
