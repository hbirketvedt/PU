import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase_config";
import "../css/app.scss"
import {useForm} from "react-hook-form";


function NewRecipe() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const recipesCollectionRef = collection(db, "newRecipes");

    const submitData = async (data) => {
        await addDoc(recipesCollectionRef, {
            title: data.title, description: data.description, ingredients: null
        })
        console.log("pushed to database")
        window.location.href="/ingredients"
    }


    return (
        <form
            className={"card"}
            onSubmit={handleSubmit((data) => {
                submitData(data)

            })}
        >
            <label className={"input"}>
                {/*<span className={"input__label"}> {errors.title?.message}</span>*/}
                <input
                    {...register("title", {
                        minLength: {
                            value: 4,
                            message: "Minimum title length is 4"
                        }
                    })}
                    className={"input__field"}/>
                <span className={"input__label"}>Title</span>
            </label>

            <label className={"input"}>
                {/*<span className={"input__label"}>{errors.description?.message}</span>*/}
                <input
                    {...register("description", {
                        required: "This is required",
                        minLength: {
                            value: 4,
                            message: "Minimum title length is 4"
                        }
                    })}
                    className={"input__field"}/>
                <span className={"input__label"}>Description</span>
            </label>

            <input type={"submit"}/>
        </form>








        // <form onSubmit={handleSubmit((data => {
        //     console.log(data)
        // }))} className={"card"}>
        //     <label className={"input"} id={"inputField"}>
        //         <input className={"input__field"} type={"text"} onChange={(event) => setTitle(event.target.value)}/>
        //         <span className={"input__label"}>Title</span>
        //     </label>
        //     <label className={"input"} id={"descriptionField"}>
        //         <input className={"input__field"} type={"text"}
        //                onChange={(event) => setDescription(event.target.value)}/>
        //         <span className={"input__label"}>Description</span>
        //     </label>
        //     <label className={"input"} id={"ingredientsField"}>
        //         <input className={"input__field"} type={"text"}
        //                onChange={(event) => setIngredients([event.target.value])}/>
        //         <span className={"input__label"}>Ingredients</span>
        //     </label>
        //
        //     <div className={"button-group"}>
        //         <button type={"submit"}>Submit</button>
        //         <button type={"reset"}>Reset</button>
        //     </div>
        // </form>
    )
}

export default NewRecipe;