import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase_config";
import {useEffect, useState} from "react";
import RecipeCard from "./recipeCard";
import "./recipeFeed.scss"
import {useNavigate} from "react-router";

function RecipeFeed() {
    // Constants used in function
    const recipesCollectionRef = collection(db, "newRecipes");
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate()


    /**
     * Loads recipes from database. Empty dependency array ( [] at the end of useEffect)
     * specifies that the function only runs once on load
     */
    useEffect(() => {
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            const recipes = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setRecipes(recipes)
        };
        loadRecipes();
        console.log("Database polled");
    }, []);


    const handleRecipeClicked = (recipe) => {
        navigate("/displayRecipe", {state: {recipe: recipe}})
    }


    return (
        <div>
            <h1 className={"h1"}>Oppskrifter</h1>
            <div className={"center columns"}>
                {recipes.map((recipe) => {
                    return (
                        <button onClick={() => handleRecipeClicked(recipe)} key={recipe.id + "1"}>
                        <RecipeCard
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            imageUrl={recipe.imageUrl}
                            time={recipe.timeEstimate}
                            portions={recipe.portions}
                            style={{margin: "10rem"}}
                            key={recipe.id}
                        /></button>)

                })}
            </div>
        </div>
    )

}

export default RecipeFeed;