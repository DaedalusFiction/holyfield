import React from 'react'
import { db, storage } from '../firebase'
import { doc, collection, query, where, getDocs, orderBy, limit  } from 'firebase/firestore'
import { useEffect, useState } from 'react'


const PhotoGallery = ({ page }) => {
    const [photoDatas, setPhotoDatas] = useState(new Array(20).fill({}));
    const [URLs, setURLs] = useState([]);
    const [largePhoto, setLargePhoto] = useState(null);
    useEffect( async () => {
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
        console.log(newPhotoDatas);
    }, [])

    const handleClick = (e) => {
        setLargePhoto(e.target.src);

    }
    

    return (
        <div className='container gallery'>
            <h2>{page}</h2>
            <div className='photos'>
                {URLs.map((URL, index) => {
                    return <div>
                            <p>{"title" in photoDatas[index] ? photoDatas[index].title : "" }</p>
                            <img className={URL === largePhoto ? "largePhoto" : ""} key={URL} src={URL} onClick={handleClick} alt="page photo" />
                            {/* <div className="photo-options">+</div> */}
                            {photoDatas[index].comment ? <q>{photoDatas[index].comment}</q> : <p></p>}
                            
                        </div>
                })}
            </div>

        </div>
    )
}

export default PhotoGallery
