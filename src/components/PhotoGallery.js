import React from 'react'
import { db, storage } from '../firebase'
import { doc, collection, query, where, getDocs  } from 'firebase/firestore'
import { useEffect, useState } from 'react'


const PhotoGallery = ({ page }) => {
    const [URLs, setURLs] = useState([]);
    useEffect( async () => {
        const q = query(collection(db, "photos"), where(`categories.${page}`, "==", true));
        const newURLs = [];
        console.log(q);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            newURLs.push(doc.data().URL);
            console.log(doc.data().URL)
        })
        setURLs(newURLs)
    }, [])

    

    return (
        <div className='container'>
            <h2>{page} photos</h2>
            <div className='photos'>
                {URLs.map((URL) => {
                    return <img key={URL} src={URL} alt="page photo" />
                })}
            </div>

        </div>
    )
}

export default PhotoGallery
