import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase_config";
import "../../css/app.scss"
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router";
import {useState} from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from 'react-select/animated';
import Textarea from 'react-textarea-autosize';
import Select from "react-select";

function NewRecipe() {
    const [image, setImage] = useState(null)
    const {register, handleSubmit, control} = useForm()
    const recipesCollectionRef = collection(db, "newRecipes");
    const navigate = useNavigate();

    /**
     * Categories for category dropdown menu. Value is value passed from function, label is displayed label to user.
     */
    const categories = [
        {value: "dinner", label: "Middag"},
        {value: "lunch", label: "Lunch"},
        {value: "breakfast", label: "Frokost"},
    ]


    /**
     * Default value for ingredients in dropdown-list. Possible to type in custom ingredients as well.
     */
    const ingredients = [
        {value: "Gulrøtter", label: "Gulrøtter"},
        {value: "Kjøtt", label: "Kjøtt"},
        {value: "Kylling", label: "Kylling"},
        {value: "Lam", label: "Lam"},
        {value: "Spinat", label: "Spinat"},
        {value: "Løk", label: "Løk"},
        {value: "Vann", label: "Vann"},
        {value: "Egg", label: "Egg"},
        {value: "Mel", label: "Mel"},
        {value: "Epler", label: "Epler"},
        {value: "Tomat", label: "Tomat"},
        {value: "Salat", label: "Salat"},
        {value: "Agurk", label: "Agurk"},
    ]

    /**
     *
     * @param data Passes title and description from input fields to /ingredients page. data variable is included from
     * useForm() hook.
     * @return {Promise<void>}
     */
    const submitData = async (data) => {
        // await addDoc(recipesCollectionRef, {
        //     title: data.title,
        //     timeEstimate: data.timeEstimate,
        //     portions: data.portions,
        //     ingredients: data.ingredients,
        //     category: data.category,
        //     description: data.description,
        // });
        // console.log(data.ingredients)
        console.log()

    }


    /**
     * Stores uploaded photo in image variable
     */
    const handleChosenImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }


    return (
        <div className={"card"}>
            <form
                onSubmit={handleSubmit((data) => {
                    submitData(data)
                })}
            >
                <h3 className={"input__label"}>Oppskriftens navn: </h3>
                <input
                    {...register("title", {
                        minLength: {
                            value: 3,
                            message: "Minimum title length is 3"
                        }
                    })}
                    type={"text"}
                    className={"input__field"}
                />

                <h5 className={"input__label"}>Tidsestimat: </h5>
                <input
                    {...register("timeEstimate", {
                        minLength: {
                            value: 1,
                            message: "Minimum time estimate is 1"
                        }
                    })}
                    className={"input__field"}
                />

                <h5 className={"input__label"}>Antall Porsjoner: </h5>
                <input
                    {...register("portions", {
                        required: "This is required",
                        minLength: {
                            value: 1,
                            message: "Minimum title length is 1"
                        }
                    })}
                    type={"number"}
                    className={"input__field"}/>


                <h5 className={"input__label"}>Legg til bilde</h5>
                <input
                    type={"file"}
                    onChange={handleChosenImage}
                    className={"input__field"}
                />

                <h5 className={"input__label"}>Ingredienser: </h5>
                <Controller
                    // Name specifies key in register
                    name="ingredients"
                    control={control}
                    render={({field}) => <CreatableSelect
                        {...field}
                        // Options form const declared earlier
                        options={ingredients}
                        // Allow multiple choices
                        isMulti
                        // defines css
                        className={"input__field"}
                    />}
                />

                <h5 className={"input__label"}>Kategori: </h5>
                <Controller
                    // Name specifies key in register
                    name="category"
                    control={control}
                    render={({field}) => <Select
                        {...field}
                        // Options form const declared earlier
                        options={categories}
                        // defines css
                        className={"input__field"}
                    />}
                />


                {/*<h5 className={"input__label"}>Kategori: </h5>*/}
                {/*<Select*/}
                {/*    {...register("category")}*/}
                {/*    options={categories}*/}
                {/*    className={"input__field"}*/}
                {/*/>*/}

                <h5 className={"input__label"}>Fremgangsmåte: </h5>
                <Textarea
                    {...register("description", {
                        required: "This is required",
                        minLength: {
                            value: 1,
                            message: "Minimum title length is 1"
                        }
                    })}
                    type={"textarea"}
                    className={"input__field__big"}/>


                <button
                    type={"submit"}
                    className={"input__submit"}
                >Publiser
                </button>
            </form>
        </div>
    )
}

export default NewRecipe;