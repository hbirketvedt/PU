import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase_config";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


function RecipeCard(props) {
    const documentID = props.id
    // const documentID = "39AquvXple9d6XbFHuam"
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const recipesCollectionRef = collection(db, "newRecipes");
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [ingredients, setIngredients] = useState(props.ingredients)
    const starsRef = ref(getStorage(), `images/${props.imageUrl}`);


    // useEffect(() => {
    //     const loadRecipes = async () => {
    //         const data = await getDocs(recipesCollectionRef);
    //         const recipe = data.docs.find((doc) => doc.id === documentID).data();
    //         setTitle(recipe.title)
    //         setDescription(recipe.description)
    //         setIngredients(recipe.ingredients)
    //     };
    //     loadRecipes();
    //     console.log("Database polled");
    // }, []);
    //
    //
    // const handleChange = (e) => {
    //     if (e.target.files[0]) {
    //         setImage(e.target.files[0])
    //     }
    // }
    //
    // const handleUpload = () => {
    //     const storage = getStorage();
    //     const storageRef = ref(storage, `/images/${image.name}`);
    //     uploadBytes(storageRef, image).then((snapshot) => {
    //         console.log('Uploaded a blob or file!');
    //     });
    // }
    //
    useEffect(() => {
            const handleDownload = async () => {
                // Create a reference to the file we want to download

                getDownloadURL(starsRef)
                    .then((url) => {
                        setUrl(url)
                    })
                    .catch((error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/object-not-found':
                                // File doesn't exist
                                break;
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            // ...

                            case 'storage/unknown':
                                // Unknown error occurred, inspect the server response
                                break;
                        }
                    });
            }
            handleDownload()
        }
    )

    return (
        <div className={"recipeCard"}>
            <img
                src={url}
                alt={""}
                className={"recipeCard__image"}
            />
            <h1 className={"recipeCard__h1"}>{title}</h1>
            <h4 className={"recipeCard__h3"}>{description}</h4>
            <h3 className={"recipeCard__h4"}>Ingredienser:</h3>
            <ul className={"recipeCard__ul"}>
                {ingredients.map((ingredient) => {
                    return <li> {ingredient} </li>
                })}
            </ul>

        </div>

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

export default RecipeCard;