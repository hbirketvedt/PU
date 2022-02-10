import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase_config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newRecipePrice, setNewRecipePrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    /**
     *
     * @returns {void}
     */
    const loadRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    loadRecipes();
    console.log("Database polled");
  }, [refresh]);

  const increasePrice = async (id, price, increase) => {
    const recipeDoc = doc(db, "recipes", id);
    if (increase) {
      await updateDoc(recipeDoc, { price: price + 1 });
    } else {
      await updateDoc(recipeDoc, { price: price - 1 });
    }
    setRefresh(!refresh);
  };

  const saveRecipe = async () => {
    await addDoc(recipesCollectionRef, {
      mealtype: newRecipeName,
      price: newRecipePrice,
      ingredients: [],
    });
    setRefresh(!refresh);
  };

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
        <button onClick={saveRecipe}> Save recipe </button>
      </div>
      <div>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h1>Meal: {recipe.mealtype}</h1>
              <h1>Price: {recipe.price}</h1>
              <button
                onClick={() => increasePrice(recipe.id, recipe.price, true)}
              >
                +
              </button>
              <button
                onClick={() => increasePrice(recipe.id, recipe.price, false)}
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
              {/*  {recipe.ingredients.map((ingredient) => {*/}
              {/*    return <div> {ingredient} </div>;*/}
              {/*  })}*/}
              {/*</h1>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
