import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase_config";
import RecipeFeed from "./recipeFeed";


export default function MainRecipeFeed() {
    const recipesCollectionRef = collection(db, "recipes");
    // const [recipes, setRecipes] = useState([])
    const [recipes, setRecipes] = useState([])

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



    return (
        // Sends recipes as props to child element
        <RecipeFeed recipes={recipes}/>
    )
}