import {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Card} from "react-bootstrap";
import "./recipeCard.scss"
import {auth, db} from "../../firebase_config";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router";
import React from 'react';
import {Clock} from 'react-bootstrap-icons';
import {Rating} from 'react-simple-star-rating'

function RecipeCard(props) {
    const recipe = props.recipe
    const [url, setUrl] = useState("")
    const [title] = useState(recipe.title)
    const [timeEstimate] = useState(recipe.time)
    const [portions] = useState(recipe.portions)
    const [name] = useState(recipe.nameOfUser || "Ukjent")
    const [category] = useState(props.category)
    const [recipeId] = useState(recipe.id)
    const [date] = useState(recipe.date)
    const [cardDate, setCardDate] = useState("");
    const imageRef = ref(getStorage(), `images/${recipe.imageUrl}`);
    const [rating, setRating] = useState(0)

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
        handleDate();
        if (currentUser) {
            loadUser();
        } else {
            setAdmin(false);
        }
    })

    /**
     * Sets rating to average rating for recipeCard
     */
    useEffect(() => {
        console.log(typeof recipe.ratings)
        if (typeof recipe.ratings !== "undefined") {
            let sum = 0
            let count = 0
            Object.values(recipe.ratings).forEach(rating => {
                sum += rating
                count += 1
            })
            console.log(sum)
            // console.log(Object.keys(recipe.ratings).forEach(function (key, index) {
            //     console.log(key)
            // });
            const avg = (sum / count) || 0;
            setRating(avg)

        }
        // if (typeof recipe.ratings.values() !== "undefined") {
        //     let sum = 0
        //     // for (rating of recipe.ratings.values()) {
        //     //     sum += rating
        //     // }
        //     // const sum = recipe.ratings.values().reduce((a, b) => a + b, 0);
        //     const avg = (sum / recipe.ratings.length) || 0;
        //     setRating(avg)
        //     console.log(avg)
        // }
    }, [recipe.ratings])

    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data();
        setAdmin(user.admin);

    }

    const handleDate = async () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDay();
        const hour = today.getHours();
        const min = today.getMinutes();

        const array = date.split(".");

        const recipeDate = new Date(array[0], array[1] - 1, array[2], array[3], array[4])

        const difference = today - recipeDate;

        if (difference < 90000) {
            setCardDate("1 minutt siden")
        } else if (60000 < difference && difference < 3600000) {
            setCardDate(Math.round(difference / (1000 * 60)) + " minutter siden")
        } else if (3600000 < difference && difference < 86400000) {
            const d = Math.round(difference / (1000 * 60 * 60));
            if (d === 1) {
                setCardDate("1 time siden")
            } else {
                setCardDate(d + " timer siden")
            }
        } else if (86400000 < difference && difference < 604800000) {
            const d = Math.round(difference / (1000 * 60 * 60 * 24))
            if (d === 1) {
                setCardDate("1 dag siden")
            } else {
                setCardDate(d + " dager siden")
            }
        } else if (604800000 < difference && difference < 2419200000) {
            const d = Math.round(difference / (1000 * 60 * 60 * 24 * 7))
            if (d === 1) {
                setCardDate("1 uke siden")
            } else {
                setCardDate(d + " uker siden")
            }
        } else {
            const d = Math.round(difference / (1000 * 60 * 60 * 24 * 7))
            if (d === 1) {
                setCardDate("1 måned siden")
            } else {
                setCardDate(d + " måneder siden")
            }
        }
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
        <Card className={"card recipeCard"} style={{maxWidth: '100%', maxHeight: "100%",}}>
            <div>
                <Card.Img style={{maxWidth: "30em", maxHeight: "20rem", objectFit: "cover"}} variant="top" src={url}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle> {timeEstimate}</Card.Subtitle>
                    <Card.Subtitle> {portions} porsjoner </Card.Subtitle>
                    <Card.Subtitle> Laget av {name} </Card.Subtitle>
                    <Card.Subtitle> {category}</Card.Subtitle>
                </Card.Body>
                <div>
                    <p style={{float: "left", marginLeft: "3%"}}>
                        <Clock size={16} style={{marginRight: "0.5em"}}/>
                        {cardDate}
                    </p>
                    {admin &&
                        <p style={{color: "#960b0b", float: "right", marginRight: "3%"}}
                           onClick={(e) => deleteRecipe(e)}>Slett oppskrift?</p>}
                </div>
            </div>
            <Rating ratingValue={rating} readonly={true}/>
        </Card>
    )
}

export default RecipeCard;
