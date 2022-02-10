import {collection, getDocs, } from "firebase/firestore";
import {db} from "../../firebase_config";
import {useEffect, useState} from "react";
import { getStorage, ref } from "firebase/storage"

function RecipePage() {
    const documentID = "39AquvXple9d6XbFHuam"
    const recipesCollectionRef = collection(db, "newRecipes");
    // const [title, setTitle] = useState("")
    // const [description, setDescription] = useState("")
    // const [ingredients, setIngredients] = useState([])

    const displayImage = (e) => {
        const file = e.target.files[0]
        const storageRef = RecipePage.getStorage.ref()
        const fileRef = storageRef.child(file.name)
        fileRef.put(file).then(
            console.log("file uploaded")
        )
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }


    useEffect(() => {
        const loadRecipe = async () => {
            const data = await getDocs(recipesCollectionRef);
            const recipe = data.docs.filter(doc => doc.id === documentID).reduce((a, b) => a).data()
            console.log(recipe.title)
        };
        loadRecipe();
        console.log("Database polled");
    }, []);


    return (
        <form onSubmit={onSubmit}>
            <input type={"file"} onChange={displayImage}/>
            <button type={"submit"}>Submit</button>
        </form>


        // <div className={"card"}>
        //     <h1>{title}</h1>
        //     <h5> {description}</h5>
        //     <ul>
        //         <h2>Ingredienser</h2>
        //         {ingredients.map(ingredient => {
        //             return <li> {ingredient} </li>
        //         })}
        //     </ul>
        // </div>
    )
}

export default RecipePage;