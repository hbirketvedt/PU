import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase_config";
import RecipeFeed from "../recipeFeed/recipeFeed";

import {onAuthStateChanged} from "firebase/auth";
import { query, where } from "firebase/firestore";


export default function PersonalFavorites() {
    const recipesCollectionRef = collection(db, "recipes");
    // const [recipes, setRecipes] = useState([])
    const [recipes, setRecipes] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    /**
     * Loads in current user
     */
    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
    })

    /**
     * Loads recipes from database. Empty dependency array ( [] at the end of useEffect)
     * specifies that the function only runs once on load
     */
    useEffect(() => {
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            console.log("innlogget bruker:", currentUser.uid)
            // const recipes = data.docs.filter(doc => doc.data().favoritedByUser == currentUser.uid).map(doc => ({...doc.data(), id: doc.id}))
            //const recipes = data.docs.filter(doc => doc.data().favoritedByUser.includes(currentUser.uid)).map(doc => ({...doc.data(), id: doc.id}))
            //const recipes = data.docs.filter(doc => doc.data().favoritedByUser,'array-contains', currentUser.uid).map(doc => ({...doc.data(), id: doc.id}))
            
            //const favs = query(recipesCollectionRef, where("regions", "array-contains", "west_coast"));
            //const recipes = data.docs.filter(doc => doc.data().favoritedByUser, where(doc => doc.data().favoritedByUser,'array-contains', currentUser.uid) ).map(doc => ({...doc.data(), id: doc.id}));
            //const recipes = data.docs.filter(doc => doc.data().favoritedByUser.currentUser.uid).get().map(doc => ({...doc.data(), id: doc.id}));
            //const recipes = query(recipesCollectionRef, where(doc => doc.data().favoritedByUser, "array-contains", currentUser.uid).map(doc => ({...doc.data(), id: doc.id})));
            setRecipes(recipes)
        };
        loadRecipes();
    }, [currentUser]);



    return (
        <RecipeFeed recipes={recipes}/>
    )
}