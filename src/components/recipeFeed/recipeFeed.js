import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {db} from "../../firebase_config";
import RecipeCard from "./recipeCard";
import "./recipeFeed.scss"


function RecipeFeed(props) {
    // Constants used in function
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        setRecipes(props.recipes)
        console.log(props.recipes)
    }, [props.recipes])


    const handleRecipeClicked = (recipe) => {
        navigate("/displayRecipe", {state: {recipe: recipe}})
    }


    return (
        <div className = "container-1">
            {recipes.map((recipe) => {
                return (
                    <div onClick={() => handleRecipeClicked(recipe)} key={recipe.id + "1"}>
                        <RecipeCard
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            imageUrl={recipe.imageUrl}
                            time={recipe.timeEstimate}
                            portions={recipe.portions}
                            date={recipe.date}
                            name={recipe.nameOfUser || "Ukjent"}
                            style={{margin: "10rem"}}
                            key={recipe.id}
                        /></div>)

            })}
        </div>
    )

}

export default RecipeFeed
