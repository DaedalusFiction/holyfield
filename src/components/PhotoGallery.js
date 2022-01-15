
import { db } from '../firebase'
import { collection, query, where, getDocs, limit, orderBy  } from 'firebase/firestore'
import { useEffect, useState } from 'react'


const PhotoGallery = ({ page, largePhoto, setLargePhoto }) => {
    const [photoDatas, setPhotoDatas] = useState(new Array(30).fill({}));
    const [URLs, setURLs] = useState([]);
    const [reversed, setReversed] = useState(false);

    useEffect( () => {
        //gets photo information from firestore (database) and storage
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

    const oldestFirst = (e) => {
        if (!reversed) {
            setURLs(URLs.reverse());
            setPhotoDatas(photoDatas.reverse());
            setReversed(true);
        }
    }

    const newestFirst = () => {
        if (reversed) {
            setURLs(URLs.reverse());
            setPhotoDatas(photoDatas.reverse());
            setReversed(false);
        }
    }
    
    
    const enlargePhoto = (e) => {
        setLargePhoto(e.target.src);
    }


    return (
        <div className={largePhoto ? 'blurred gallery' : 'gallery'} >
            <div className="container">
                <h2>{page}</h2>
                <button className={!reversed ? "reversed" : ''} onClick={newestFirst}>newest first</button>
                <button className={reversed ? "reversed" : ''} onClick={oldestFirst}>oldest first</button>
                <div className='photos'>
                    {URLs.map((URL, index) => {
                        return <div key={URL} className={URL === largePhoto ? "largePhoto" : ""} id={URL === largePhoto ? "largePhoto" : "smallPhoto"}>
                                <img key={URL} src={URL} onClick={enlargePhoto} alt="page" />
                                {photoDatas[index].title && largePhoto && <p>{photoDatas[index].title}</p> }
                                {photoDatas[index].comment && largePhoto && <p>{photoDatas[index].comment}</p> }
                            </div>
                    })}
                </div>
            </div>

        </div>
    )
}

export default PhotoGallery
