import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase_config";
import RecipeFeed from "../recipeFeed/recipeFeed";
import {onAuthStateChanged} from "firebase/auth";
import { useLocation } from "react-router";

export default function OthersRecipeFeed() {
    const recipesCollectionRef = collection(db, "recipes");
    // const [recipes, setRecipes] = useState([])
    const [recipes, setRecipes] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const {state} = useLocation()


    /**
     * Loads in current user
     * Denne setter til den nåværende brukeren, vi må sette den til brukeren vi vil se oppskriftene til
     */
    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(state.recipes.uid);
        setRecipes(currentUser.recipes)
    })


    /**
     * Loads recipes from database. Empty dependency array ( [] at the end of useEffect)
     * specifies that the function only runs once on load
     */
    useEffect(() => {
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            const recipes = data.docs.filter(doc => doc.data().userID === currentUser.uid).map(doc => ({...doc.data(), id: doc.id}))
            setRecipes(recipes)
        };
        loadRecipes();
        console.log("Database polled");
    }, [currentUser]);



    return (
        <RecipeFeed recipes={recipes}/>
    )
}