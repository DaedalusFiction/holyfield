import React from 'react'
import { db } from '../firebase'
import { collection, where, query, getDocs, limit, orderBy  } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Recipe from './Recipe'


const RecipesGallery = ({ page }) => {
    const categories = ["appetizer", "main", "dessert", "snack", "other"];
    const [course, setCourse] = useState("appetizer");
    const [photoDatas, setPhotoDatas] = useState(new Array(30).fill({}));
    const [selected, setSelected] = useState("appetizer");
    const [examinedRecipe, setExaminedRecipe] = useState(null);

    useEffect( () => {
        async function getPhotos() {
            const q = query(collection(db, "recipes"), orderBy("uploaded"), where(`courses.${course}`, "==", true), limit(30));
            const newURLs = [];
            const newPhotoDatas = [];
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                newURLs.push(doc.data().URL);
                newPhotoDatas.push(doc.data());
            })
            
            setPhotoDatas(newPhotoDatas.reverse());
        }

        getPhotos();

    }, [course])


    const selectCourse = (e) => {
        setSelected(e.target.id);
        setCourse(e.target.id);
        setExaminedRecipe(null);
    }

    const examine = (e) => {
        console.log(photoDatas[parseInt(e.target.id)].title);
        setExaminedRecipe(photoDatas[parseInt(e.target.id)]);
        
    }

    const goBack = () => {
        setExaminedRecipe(null);
    }
    

    return (
        <div className='gallery'>
            <div className="container">
                <h2>{page}</h2>
                <div className="course-buttons">
                    {categories.map((course) => {
                        return <button id={course} key={course} className={selected === course ? "reversed " + course : course} onClick={selectCourse}>{course}</button>
                    })}
                    {examinedRecipe && <button onClick={goBack}>Go Back</button>}
                </div>
                {!examinedRecipe && <ul className='recipe-links'>
                    {photoDatas.map((photoData, index) => {
                        return <li key={index}><button className="recipe-link" id={index} onClick={examine}>{photoDatas[index].title}</button></li>
                     })}
                </ul>}

                
                {examinedRecipe && <Recipe examinedRecipe={examinedRecipe}  />}
            </div>

        </div>
    )
}

export default RecipesGallery
