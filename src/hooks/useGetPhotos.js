import { useState, useEffect } from "react";
import {
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    where,
    startAfter,
} from "firebase/firestore";
import { db } from "../firebase";

function useGetPhotos(category, lastVisible) {
    const [photos, setPhotos] = useState(null);
    const [last, setLast] = useState(null);

    useEffect(() => {
        async function getPhotos() {
            let q;
            if (lastVisible === false) {
                if (category === "All") {
                    q = query(
                        collection(db, "photos"),
                        orderBy("createdAt", "desc"),
                        limit(25)
                    );
                } else {
                    q = query(
                        collection(db, "photos"),
                        orderBy("createdAt", "desc"),
                        where("category", "==", category),
                        limit(25)
                    );
                }
            } else {
                if (category === "All") {
                    q = query(
                        collection(db, "photos"),
                        orderBy("createdAt", "desc"),
                        startAfter(lastVisible),
                        limit(25)
                    );
                } else {
                    q = query(
                        collection(db, "photos"),
                        where("category", "==", category),
                        orderBy("createdAt", "desc"),
                        startAfter(lastVisible),
                        limit(25)
                    );
                }
            }

            const docsSnap = await getDocs(q);
            let newPhotos = [];
            docsSnap.docs.forEach((doc, index) => {
                newPhotos = [...newPhotos, doc.data()];
                // console.log(doc.data());
            });
            setLast(docsSnap.docs[docsSnap.docs.length - 1]);
            setPhotos(newPhotos);
        }

        getPhotos();
    }, [category, lastVisible]);
    return [photos, last];
}

export default useGetPhotos;
