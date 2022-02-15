import {useState} from "react";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase_config";


function AddIngredients() {
    // Constants used in function
    const {register, handleSubmit, getValues, reset} = useForm()
    const [ingredients, setIngredients] = useState([])
    const {state} = useLocation()
    const recipesCollectionRef = collection(db, "newRecipes");
    const navigate = useNavigate()

    /**
     * Takes new ingredient value from input field and adds it to ingredients array. Removes old ingredient from
     * input field.
     */
    const handleAddIngredient = () => {
        setIngredients([...ingredients, getValues("ingredient")])
        reset()
    }

    /**
     * Uploads recipes stored in state and ingredients
     * @return {Promise<void>}
     */
    const handleSubmitRecipe = async () => {
        await addDoc(recipesCollectionRef, {
            title: state.title, description: state.description, ingredients: ingredients,
        });
        console.log("Pushed to database")
        navigate("/splashPage")
    }


    return (
        <div>
            <div className={"rowA"}>
                <h1>{state.title}</h1>
                <form onSubmit={handleSubmit(data => {
                    handleAddIngredient()
                })}>
                    {/*input values are stored using useForm() hook */}
                    <input
                        placeholder={"ingredient"}
                        {...register("ingredient", {})}
                        // onChange={(event) => setNewIngredient(event.target.value)}
                    />
                    <button
                        type={"submit"}>
                        Add ingredient
                    </button>
                </form>
            </div>
            <div className={"rowB"}>
                <ul>
                    {ingredients.map(ingredient => {
                        return <li>{ingredient}</li>
                    })}
                </ul>
            </div>

            <div className={"rowC"}>
                <button onClick={handleSubmitRecipe}>
                    Submit recipe
                </button>
            </div>
        </div>


        // <div>
        //     { ingredients }
        //     <input
        //         placeholder={"ingredients"}
        //         onChange={(event) => setNewIngredient(event.target.value)}
        //     />
        //     <button onClick={handleAddIngredient}>
        //         Add ingredient
        //     </button>
        //
        // </div>
    )
}

export default AddIngredients;