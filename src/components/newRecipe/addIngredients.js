import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import IngredientList from "./ingredientList";


function AddIngredients() {
    const {register, handleSubmit, getValues, reset} = useForm()
    const [ingredients, setIngredients] = useState([])

    const handleAddIngredient = (data) => {
        setIngredients([...ingredients, getValues("ingredient")])
        reset()
    }


    return (
        <div>
            <h1>Legg til ingredienser</h1>
            <form onSubmit={handleSubmit(data => {
                handleAddIngredient(data)
            })}>
                <input
                    placeholder={"ingredient"}
                    {...register("ingredient", {})}
                    // onChange={(event) => setNewIngredient(event.target.value)}
                />
                <button
                    type={"submit"}>
                    Add ingredient
                </button>
                <span> {ingredients}</span>
                
            </form>
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