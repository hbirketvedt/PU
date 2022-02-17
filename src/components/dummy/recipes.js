import {useState, useEffect} from "react";
import {db} from "../../firebase_config";
import {
    collection, getDocs, addDoc, updateDoc, doc, deleteDoc,
} from "firebase/firestore";
import Navbar from "../navbar/navbar";

function Recipes() {
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newRecipePrice, setNewRecipePrice] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const recipesCollectionRef = collection(db, "recipes");

    useEffect(() => {
        /**
         * Loads recipes from FireBase
         * @returns {Promise<void>}
         */
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            setRecipes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        loadRecipes();
        console.log("Database polled");
    }, [refresh]);

    /**
       * Increments or decrements price based on operator and refreshes page
       * @returns {Promise<void>}
     */
    const changePrice = async (id, price, operator) => {
        const recipeDoc = doc(db, "recipes", id);
        if (operator) {
            await updateDoc(recipeDoc, {price: price + 1});
        } else {
            await updateDoc(recipeDoc, {price: price - 1});
        }
        setRefresh(!refresh);
    };


    /**
     * Saves recipeFeed when save button is pushed and refreshes page
     * @return {Promise<void>}
     */
    const saveRecipe = async () => {
        await addDoc(recipesCollectionRef, {
            mealtype: newRecipeName, price: newRecipePrice, ingredients: [],
        });
        setRefresh(!refresh);
    };

    /**
     * Deletes recipeFeed matching inputID
     * @param id documentID of recipeFeed to delete
     * @return {Promise<void>}
     */
    const deleteRecipe = async (id) => {
        const recipeDoc = doc(db, "recipes", id);
        await deleteDoc(recipeDoc);
        setRefresh(!refresh);
    };

    return (
        <div>
            <div>
                <input
                    placeholder={"Name"}
                    onChange={(event) => setNewRecipeName(event.target.value)}
                />
                <input
                    placeholder={"Price"}
                    onChange={(event) => setNewRecipePrice(parseInt(event.target.value))}
                />
                <button onClick={saveRecipe}> Save recipe</button>
            </div>
            <div>
                {recipes.map((recipe) => {
                    return (<div key={recipe.id}>
                        <h1>Meal: {recipe.mealtype}</h1>
                        <h1>Price: {recipe.price}</h1>
                        <button
                            onClick={() => changePrice(recipe.id, recipe.price, true)}
                        >
                            +
                        </button>
                        <button
                            onClick={() => changePrice(recipe.id, recipe.price, false)}
                        >
                            -
                        </button>
                        <button
                            onClick={() => {
                                deleteRecipe(recipe.id);
                            }}
                        >
                            {" "}
                            Delete recipe
                        </button>
                        {/*<h1>*/}
                        {/*  Ingredients:{" "}*/}
                        {/*  {recipeFeed.ingredients.map((ingredient) => {*/}
                        {/*    return <div> {ingredient} </div>;*/}
                        {/*  })}*/}
                        {/*</h1>*/}
                    </div>);
                })}
            </div>
        </div>);
}

export default Recipes;
