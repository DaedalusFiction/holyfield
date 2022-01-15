
import RecipesGallery from './RecipesGallery'

const Recipes = ({largePhoto, setLargePhoto}) => {
    return (
        <div>
            <RecipesGallery page="recipes" largePhoto={largePhoto} setLargePhoto={setLargePhoto}/>
        </div>
    )
}

export default Recipes
