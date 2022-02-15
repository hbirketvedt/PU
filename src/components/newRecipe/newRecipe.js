import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase_config";
import "../../css/app.scss"
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useState} from "react";

function NewRecipe() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const recipesCollectionRef = collection(db, "newRecipes");
    const navigate = useNavigate();
    const [image, setImage] = useState(null)

    /**
     *
     * @param data Passes title and description from input fields to /ingredients page. data variable is included from
     * useForm() hook.
     * @return {Promise<void>}
     */
    const submitData = async (data) => {
        navigate("/ingredients", {state: data})
    }


    return (
        <div className={"card"}>
            <form
                onSubmit={handleSubmit((data) => {
                    submitData(data)
                })}
            >
                <h3>Oppskriftens navn: </h3>
                <input
                    {...register("title", {
                        minLength: {
                            value: 4,
                            message: "Minimum title length is 4"
                        }
                    })}
                    className={"input__field"}
                />

                <h4>Tidsestimat: </h4>
                <input
                    {...register("time_estimate", {
                        minLength: {
                            value: 1,
                            message: "Minimum time estimate is 1"
                        }
                    })}
                    className={"input__field"}
                />
                <input
                    {...register("description", {
                        required: "This is required",
                        minLength: {
                            value: 4,
                            message: "Minimum title length is 4"
                        }
                    })}
                    className={"input__field"}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}

export default NewRecipe;