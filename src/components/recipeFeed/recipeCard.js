import {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Card} from "react-bootstrap";
import "./recipeCard.scss"
import { auth } from "../../firebase_config";
import {db} from "../../firebase_config";
import {collection, getDocs} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import { useNavigate } from "react-router";
import { doc, deleteDoc } from "firebase/firestore";

function RecipeCard(props) {
    const [url, setUrl] = useState("")
    const [title] = useState(props.title)
    const [timeEstimate] = useState(props.time)
    const [portions] = useState(props.portions)
    const [name] = useState(props.name)
    const[category] = useState(props.category)
    const [recipeId] = useState(props.id)
    const imageRef = ref(getStorage(), `images/${props.imageUrl}`);

    const usersCollectionRef = collection(db, "users")
    const [currentUser, setCurrentUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    /**
     * Sjekker om brukeren er er admin.
     * Hvis ja, så kan brukeren slette en opprskift.
     */

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
        if (currentUser) {
            loadUser();
        } else {
            setAdmin(false);
        }
    })

    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data();
        setAdmin(user.admin);
    }

    //Sletter oppskrifter
    const deleteRecipe = async (e) => {

        if (window.confirm("Er du sikker på at ønsker å slette oppskriften?")) {
            await deleteDoc(doc(db, "recipes", recipeId));
            goToRecipes();
        } 
        e.stopPropagation();
    }


    const goToRecipes = async () => {
        navigate("/oppskrifter")
    }

    /**
     * Loads correct url for image into url variable using relative path from variable imageRef. Include url in <img>
     *     component (found in return statement) to load image to page.
     */
    useEffect(() => {
            const handleDownload = async () => {
                // Create a reference to the file we want to download

                getDownloadURL(imageRef)
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
                            default:
                                break;
                        }
                    });
            }
            handleDownload().then(r => console.log("image downloaded"))
        }, []
    )


    return (
        <Card className={"card recipeCard"} style={{width: '35rem', height: "30rem"}}>
            <Card.Img style={{width: "100%", height: "20rem", objectFit: "cover"}} variant="top" src={url}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle> { timeEstimate}</Card.Subtitle>
                <Card.Subtitle> { portions } porsjoner </Card.Subtitle>
                <Card.Subtitle> Laget av { name } </Card.Subtitle>
                <Card.Subtitle> {category}</Card.Subtitle>
            </Card.Body>
            {admin &&
            <p style={{color:"#960b0b", marginLeft:"80%"}} onClick={(e) => deleteRecipe(e)}>Slett oppskrift?</p>}
        </Card>

        // <div>
        //     <img src={url} alt={""}/>
        //     <body>
        //     <title>{title}</title>
        //         <sub> { timeEstimate }</sub>
        //         <sub> { portions } porsjoner </sub>
        //         <sub> Laget av { name }</sub>
        //     </body>
        // </div>


    )
}

export default RecipeCard;