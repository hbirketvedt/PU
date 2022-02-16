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
            <h1 className={"centered_text weighted__text"}>Oppskrifter</h1>
            <div className={"center columns"}>
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            ingredients={recipe.ingredients}
                            imageUrl={recipe.imageUrl}
                            style={{margin: "10rem"}}
                        />)
                })}
            </div>
        </div>
    )

}

export default RecipeFeed;