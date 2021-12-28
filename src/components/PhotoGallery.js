import React from 'react'
import { db } from '../firebase'
import { collection, query, where, getDocs, limit  } from 'firebase/firestore'
import { useEffect, useState } from 'react'


const PhotoGallery = ({ page }) => {
    const [photoDatas, setPhotoDatas] = useState(new Array(30).fill({}));
    const [URLs, setURLs] = useState([]);
    const [largePhoto, setLargePhoto] = useState(null);

    useEffect( () => {
        async function getPhotos() {
            const q = query(collection(db, "photos"), where(`categories.${page}`, "==", true), limit(30));
            const newURLs = [];
            const newPhotoDatas = [];
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                newURLs.push(doc.data().URL);
                newPhotoDatas.push(doc.data());
            })
    
            setURLs(newURLs);
            setPhotoDatas(newPhotoDatas);
        }

        getPhotos();

    }, [page])

    
    const resetGallery = (e) => {
        if (e.target.src === largePhoto) {return}
        else if (largePhoto != null) {setLargePhoto(null)}
    }
    
    const handleClick = (e) => {
        setLargePhoto(e.target.src);
    }

    return (
        <div className={largePhoto ? 'blurred container gallery' : 'container gallery'} onClick={resetGallery}>
            <h2>{page}</h2>
            <div className='photos'>
                {URLs.map((URL, index) => {
                    return <div key={URL} className={URL === largePhoto ? "largePhoto" : ""} id={URL === largePhoto ? "largePhoto" : "smallPhoto"}>
                            <img key={URL} src={URL} onClick={handleClick} alt="page" />
                            {"title" in photoDatas[index] && <p>{photoDatas[index].title}</p> }
                            {photoDatas[index].comment && <p>{photoDatas[index].comment}</p> }
                            
                        </div>
                })}
            </div>

        </div>
    )
}

export default PhotoGallery
