import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDoc, doc, getDocs, query, where } from '@firebase/firestore';

const ImageGrid = ({ category }) => {
    const [docs, setDocs] = useState(["3", "4"]);
    const [testImage, setTestImage] = useState(null)

    useEffect(async () => {
        const imagesCollection = collection(db, 'images')
        
        const docRef = doc(db, 'photos', 'rZ1TZBNea2edOR5fxEys');
        const docSnap = await getDoc(docRef);
        const q = query(imagesCollection);
        const querySnapshot = await getDocs(q);
        if (docSnap.exists()) {
            console.log('data: ', querySnapshot);
            
            setTestImage(docSnap.data().URL)
        } else {
            console.log("failure")
        }
        
        
        return () => {
            
        }
    }, [])


    return (
        <div className="img-grid">
            <img className="img" src={testImage} />
            {/* {imagesCollection.map((doc) => {
                return <div className="">{doc}</div>
            })} */}
        </div>
    )
}

export default ImageGrid
