import {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Card} from "react-bootstrap";
import "./recipeCard.scss"

function RecipeCard(props) {
    // const documentID = "39AquvXple9d6XbFHuam"
    const [url, setUrl] = useState("")
    const [title] = useState(props.title)
    const [timeEstimate] = useState(props.time)
    const [portions] = useState(props.portions)
    const [name] = useState(props.name)
    const imageRef = ref(getStorage(), `images/${props.imageUrl}`);




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
            handleDownload().then(r => console.log("download complete"))
        }
    )

    return (
        <Card className={"card"} style={{width: '40rem', height: "30rem"}}>
            <Card.Img style={{width: "100%", height: "20rem", objectFit: "cover"}} variant="top" src={url}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle> { timeEstimate}</Card.Subtitle>
                <Card.Subtitle> { portions } porsjoner </Card.Subtitle>
                <Card.Subtitle> Laget av { name } </Card.Subtitle>
            </Card.Body>
        </Card>

    )
}

export default RecipeCard;