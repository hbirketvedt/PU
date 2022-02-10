import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase_config";
import "../../css/app.scss"
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

function NewRecipe() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const recipesCollectionRef = collection(db, "newRecipes");
    const navigate = useNavigate();

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
        </div>
    )
}

export default NewRecipe;