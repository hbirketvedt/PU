import RecipeCard from "../recipeFeed/recipeCard";
import {useEffect, useState} from "react";
import IngredientList from "./ingredientList";
import {Card} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import "./recipePage.scss"
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../../firebase_config";
import {deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import UpdateRecipe from "./updateRecipe";
import {Rating} from 'react-simple-star-rating'

function RecipePage() {
    // Had to use an empty array to create child react elements, or else they get set to null
    const [recipe, setRecipe] = useState([])
    const [rating, setRating] = useState(recipe.rating) // initial rating value
    const {state} = useLocation()
    const [showEditButton, setShowEditButton] = useState(false)
    const [showEditor, setShowEditor] = useState(false);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)


    /**
     * Loads in current user
     */
    onAuthStateChanged(auth, (currentUser) => {
        console.log(state.recipe.userID)
        console.log(currentUser.uid)
        if (currentUser.uid.localeCompare(state.recipe.userID)) {
            setShowEditButton(true)
        }
        setCurrentUser(currentUser)

    })

    /**
     * Sets recipe from received props value. Only runs once on first render.
     */
    useEffect(() => {
        setRecipe([state.recipe])
    }, [])

    /**
     * Displays editor window
     */
    const handleEdit = () => {
        setShowEditor(true)
    }


    const goToProfilePage = async () => {
        navigate("/profilePage")
    }

    const handleDelete = async () => {
        if (window.confirm("Er du sikker på at du ønsker å slette oppskriften din? Denne handlingen kan ikke angres.")) {
            await deleteDoc(doc(db, "recipes", state.recipe.id));
            console.log("Oppskriften ble slettet!")
            goToProfilePage()
        }
        console.log("Oppskriften ble slettet")
    }

    const onCloseModal = () => {
        setShowEditor(false)
    };

    /**
     * Handles rating when clicking rating
     * @param rating taken from stars. Numbers 0-100
     */
    const handleRating = async (rating) => {
        const recipeDoc = doc(db, "recipes", state.recipe.id);
        let newRatings = []
        if (typeof state.recipe.ratings === "undefined") {
            newRatings = {[currentUser.uid]: rating}
        } else {
            newRatings = {...state.recipe.ratings, [currentUser.uid]: rating}
        }
        console.log(newRatings)
        // await db.collection("recipes").doc(recipe.id).collection("ratings").add({currentUser: rating})

        await setDoc(recipeDoc, {
                ratings: newRatings
            },
            // Merges in data if document exists
            {merge: true});
        console.log("Rating uploaded")
    }

    return (
        <div>
            {recipe.map(recipe => {
                return (
                    <div key={recipe.id + "1"} className={"container-2"}>
                        {/*Editor that loads all current values as props in the newRecipe element. Hidden until user
                        starts editing the current recipe.
                        */}
                        <Modal open={showEditor} onClose={onCloseModal}>
                            <div>{showEditor ?
                                <UpdateRecipe
                                    recipe={recipe}
                                /> : null}
                            </div>
                        </Modal>
                        <RecipeCard
                            style={{margin: "10rem"}}
                            key={recipe.id}
                            recipe={recipe}
                        />
                        <IngredientList
                            key={recipe.id + "ingredients"}
                            ingredients={recipe.ingredients}
                        />
                        <Rating onClick={handleRating} ratingValue={rating}/>
                        <Card style={{width: "83rem"}}>
                            <Card.Body>
                                <Card.Title>Fremgangsmåte: </Card.Title>
                                <Card.Text>
                                    {recipe.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div>
                            <div>{!showEditButton ?
                                <button onClick={handleEdit}>Rediger oppskrift</button> : null}</div>
                            <div>{!showEditButton ?
                                <button onClick={handleDelete}>Slett oppskrift</button> : null}</div>
                        </div>
                    </div>
                )
            })}

        </div>


    )
}

export default RecipePage;