
const Recipe = ({examinedRecipe}) => {
    return (
        <div className="recipe">
            <h3>{examinedRecipe.title}</h3>
            <img src={examinedRecipe.URL} alt="examined recipe" />
            <p>{examinedRecipe.comment}</p>
        </div>
    )
}

export default Recipe
