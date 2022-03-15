import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase_config";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router";
import {useState} from "react";
import CreatableSelect from "react-select/creatable";
import Textarea from 'react-textarea-autosize';
import Select from "react-select";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import "./newRecipe.scss"
import {onAuthStateChanged} from "firebase/auth";

function NewRecipe(props) {
    const usersCollectionRef = collection(db, "users")
    const [image, setImage] = useState(null)
    const {register, handleSubmit, control} = useForm()
    const recipesCollectionRef = collection(db, "recipes");
    const navigate = useNavigate();
    // const [user, setUser] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    // const [user, setUser] = useFirebaseAuthentication()
    const [nameOfUser, setNameOfUser] = useState("Ukjent")


    // let ingredientList = {}
    // let counter = 0
    // for (let ingredient of props.ingredients) {
    //     counter: ingredient
    // }

    console.log(props.ingredients)

    /**
     * Loads in current user
     */
    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
        loadNameOfUser().then()
    })


    /**
     * Sets nameOfUser to "firstName lastName" of current user
     * @return {Promise<void>}
     */
    const loadNameOfUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data();
        setNameOfUser(user.firstName + " " + user.lastName);
        console.log(user.firstName + " " + user.lastName)
    }


    /**
     * Categories for category dropdown menu. Value is value passed from function, label is displayed label to user.
     */
    const categories = [
        {value: "Frokost", label: "Frokost"},
        {value: "Lunch", label: "Lunch"},
        {value: "Middag", label: "Middag"},
        {value: "Dessert", label: "Dessert"},
        {value: "Vegetar", label: "Vegetar"},
        {value: "Fisk", label: "Fisk"},
        {value: "Kylling", label: "Kylling"},
        {value: "Kjøtt", label: "Kjøtt"},
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
     * Uploads new recipe to firebase
     * @return {Promise<void>}
     */
    const submitData = async (data) => {
        const ingredients = []
        const category = []
        const today = new Date()
        // Month starts at 0
        const month = today.getMonth() + 1
        // Adds date to string
        const dateString = today.getFullYear() + "." + month + "." + today.getDate() + "." + today.getHours()

        let imageUrl = "blank.png"
        if (props.imageUrl != null) {
            imageUrl = props.imageUrl
        }
        // ingredients are returned as an IterableIterator so loop is used to extract only ingredients and add them
        // to collection
        for (let ing of data.ingredients.entries()) {
            ingredients.push(ing[1].value)
        }
        for (let cat of data.category.entries()) {
            category.push(cat[1].value)
        }
        // uploads image if present and sets imageUrl accordingly, which will be stored with recipe.
        if (image != null) {
            await uploadImage()
            imageUrl = image.name
        }
        // Adds recipeFeed to doc. All fields are marked as required so all fields should be filled.
        await addDoc(recipesCollectionRef, {
            title: data.title,
            timeEstimate: data.timeEstimate,
            portions: data.portions,
            ingredients: ingredients,
            category: category,
            description: data.description,
            imageUrl: imageUrl,
            date: dateString,
            userID: currentUser.uid,
            nameOfUser: nameOfUser
        });
        console.log("Recipe uploaded to database")
        navigate("/oppskrifter")
    }


    /**
     * Uploads image to storage in firebase
     * @return {Promise<void>}
     */
    const uploadImage = async () => {
        const storage = getStorage();
        const storageRef = ref(storage, `/images/${image.name}`);
        uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }


    /**
     * Stores uploaded photo in image variable
     */
    const handleChosenImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }


    /**
     * value of all fields are set for the purpose of editing recipes. In newRecipe page the values are null, ie.
     * no displayed values.
     */
    return (
        <div className={"center"}>
            <form
                onSubmit={handleSubmit((data) => {
                    submitData(data)
                })}
                className={"newRecipe"}
            >
                <h3 className={"input__label"}>Oppskriftens navn: </h3>
                <input
                    {...register("title", {
                        required: "title is required",
                        minLength: {
                            value: 3,
                            message: "Minimum title length is 3"
                        }
                    })}
                    value={props.recipeName}
                    type={"text"}
                    className={"input__field"}
                />

                <h5 className={"input__label"}>Tidsestimat: </h5>
                <input
                    {...register("timeEstimate", {
                        required: "Time estimate is required",
                        minLength: {
                            value: 1,
                            message: "Minimum time estimate is 1"
                        }
                    })}
                    value={props.timeEstimate}
                    className={"input__field"}
                />

                <h5 className={"input__label"}>Antall Porsjoner: </h5>
                <input
                    {...register("portions", {
                        required: "Portion count is required"
                    })
                    }
                    type={"number"}
                    value={props.portions}
                    className={"input__field"}/>


                <h5 className={"input__label"}>Legg til bilde</h5>
                <input
                    type={"file"}
                    onChange={handleChosenImage}
                    value={props.image}
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
                        defaultValue={[props.ingredients[0]]}
                    />}
                    rules={{required: true}}

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
                        isMulti
                        // defines css
                        className={"input__field"}
                        defaultValue={[props.category[0]]}
                    />}
                    rules={{required: true}}

                />

                <h5 className={"input__label"}>Fremgangsmåte: </h5>
                <Textarea
                    {...register("description", {
                        required: "Description is required",
                        minLength: {
                            value: 1,
                            message: "Minimum title length is 1"
                        }
                    })}
                    type={"textarea"}
                    value={props.description}
                    className={"input__field__big"}
                />
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