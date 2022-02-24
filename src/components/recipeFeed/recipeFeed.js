import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase_config";
import {useEffect, useState} from "react";
import RecipeCard from "./recipeCard";
import "./recipeFeed.scss"
import {useNavigate} from "react-router";

function RecipeFeed() {
    // Constants used in function
    const recipesCollectionRef = collection(db, "newRecipes");
    const usersCollectionRef = collection(db, "users");
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([])
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
        const loadUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            const users = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setUsers(users)
        };
        loadRecipes().then(() => console.log("Users loaded "))
        loadUsers().then(() => console.log("Users loaded "))
        console.log("Database polled");
    }, []);


    const handleRecipeClicked = (recipe) => {
        navigate("/displayRecipe", {state: {recipe: recipe}})
    }

    console.log(users)


    return (
        <div>
            <h1 className={"h1"}>Oppskrifter</h1>
            <div className={"center columns"}>
                {recipes.map((recipe) => {
                    return (
                        <div onClick={() => handleRecipeClicked(recipe)} key={recipe.id + "1"}>
                            <RecipeCard
                                name={ users.find(user => user.id === recipe.userID)?.firstName}
                                id={recipe.id}
                                title={recipe.title}
                                description={recipe.description}
                                imageUrl={recipe.imageUrl}
                                time={recipe.timeEstimate}
                                portions={recipe.portions}
                                style={{margin: "10rem"}}
                                key={recipe.id}
                            /></div>)

                })}
            </div>
        </div>
    )

}

export default RecipeFeed;