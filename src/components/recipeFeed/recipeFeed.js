import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase_config";
import {useEffect, useState} from "react";
import RecipeCard from "./recipeCard";


function RecipeFeed() {
    // Constants used in function
    const recipesCollectionRef = collection(db, "newRecipes");
    const [recipes, setRecipes] = useState([]);


    /**
     * Loads recipes from database. Empty dependency array ( [] at the end of useEffect)
     * specifies that the function only runs once on load
     */
    useEffect(() => {
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            const recipes = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setRecipes(recipes)
            console.log(recipes)

        };
        loadRecipes();
        console.log("Database polled");
    }, []);


    return (
        <div>
            <div>
                <h1>Oppskrifter</h1>
                <div className={"columns"}>
                    {recipes.map((recipe) => {
                        return (
                            <div>
                                <RecipeCard
                                    id={recipe.id}
                                    title={recipe.title}
                                    description={recipe.description}
                                    ingredients={recipe.ingredients}
                                    imageUrl={recipe.imageUrl}
                                />
                                <div className={"spacer"}></div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )

}

export default RecipeFeed;