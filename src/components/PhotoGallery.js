import React from 'react'
import { db, storage } from '../firebase'
import { doc, collection, query, where, getDocs  } from 'firebase/firestore'
import { useEffect, useState } from 'react'


const PhotoGallery = ({ page }) => {
    const [URLs, setURLs] = useState([]);
    const [largePhoto, setLargePhoto] = useState(null);
    useEffect( async () => {
        const q = query(collection(db, "photos"), where(`categories.${page}`, "==", true));
        const newURLs = [];
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            newURLs.push(doc.data().URL);
            
        })
        setURLs(newURLs)
    }, [])

    const handleClick = (e) => {
        setLargePhoto(e.target.src)
    }
    

    return (
        <div className='container gallery'>
            <h2>{page}</h2>
            <div className='photos'>
                {URLs.map((URL) => {
                    return <img className={URL === largePhoto ? "largePhoto" : ""} key={URL} src={URL} onClick={handleClick} alt="page photo" />
                })}
            </div>

        </div>
    )
}

export default PhotoGallery
