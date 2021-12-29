import React from 'react'
import { db } from '../firebase'
import { collection, query, where, getDocs, limit, orderBy  } from 'firebase/firestore'
import { useEffect, useState } from 'react'


const PhotoGallery = ({ page }) => {
    const [photoDatas, setPhotoDatas] = useState(new Array(30).fill({}));
    const [URLs, setURLs] = useState([]);
    const [largePhoto, setLargePhoto] = useState(null);

    useEffect( () => {
        async function getPhotos() {
            const q = query(collection(db, "photos"), orderBy("uploaded"), where(`categories.${page}`, "==", true), limit(30));
            const newURLs = [];
            const newPhotoDatas = [];
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                newURLs.push(doc.data().URL);
                newPhotoDatas.push(doc.data());
            })
            
            setURLs(newURLs.reverse());
            setPhotoDatas(newPhotoDatas.reverse());
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
        <div className={largePhoto ? 'blurred gallery' : 'gallery'} onClick={resetGallery}>
            <div className="container">
                <h2>{page}</h2>
                <div className='photos'>
                    {URLs.map((URL, index) => {
                        return <div key={URL} className={URL === largePhoto ? "largePhoto" : ""} id={URL === largePhoto ? "largePhoto" : "smallPhoto"}>
                                <img key={URL} src={URL} onClick={handleClick} alt="page" />
                                {"title" in photoDatas[index] && largePhoto && <p>{photoDatas[index].title}</p> }
                                {photoDatas[index].comment && largePhoto && <p>{photoDatas[index].comment}</p> }
                            </div>
                    })}
                </div>
            </div>

        </div>
    )
}

export default PhotoGallery
