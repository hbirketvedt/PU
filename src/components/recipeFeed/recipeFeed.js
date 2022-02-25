import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {db} from "../../firebase_config";
import RecipeCard from "./recipeCard";


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
        <div>
            <h1 className={"h1"}>Oppskrifter</h1>
            <div className={"center columns"}>
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
                                name={recipe.nameOfUser}
                                style={{margin: "10rem"}}
                                key={recipe.id}
                            /></div>)

                })}
            </div>
        </div>
    )

}

export default RecipeFeed;