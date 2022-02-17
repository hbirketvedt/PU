import {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {Card} from "react-bootstrap";
import "./recipeCard.scss"

function RecipeCard(props) {
    // const documentID = "39AquvXple9d6XbFHuam"
    const [url, setUrl] = useState("")
    const [title] = useState(props.title)
    const [timeEstimate] = useState(props.time)
    const [description] = useState(props.description)
    const [portions] = useState(props.portions)
    const imageRef = ref(getStorage(), `images/${props.imageUrl}`);


    /**
     * Old functions, don't delete
     */
    // useEffect(() => {
    //     const loadRecipes = async () => {
    //         const data = await getDocs(recipesCollectionRef);
    //         const recipeFeed = data.docs.find((doc) => doc.id === documentID).data();
    //         setTitle(recipeFeed.title)
    //         setDescription(recipeFeed.description)
    //         setIngredients(recipeFeed.ingredients)
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
                        }
                    });
            }
            handleDownload()
        }
    )

    return (
        <Card className={"card"} style={{width: '40rem', height: "30rem"}}>
            <Card.Img style={{width: "100%", height: "20rem", objectFit: "cover"}} variant="top" src={url}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle> {description}</Card.Subtitle>
                <Card.Subtitle> { timeEstimate} timer</Card.Subtitle>
                <Card.Subtitle> { portions } porsjoner </Card.Subtitle>
            </Card.Body>
        </Card>

    )
}

export default RecipeCard;