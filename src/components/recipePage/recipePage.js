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
    //const [user, setUser] = useState([])
    const [rating, setRating] = useState(recipe.rating) // initial rating value
    const {state} = useLocation()
    const [showEditButton, setShowEditButton] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [showVisitButton, setShowVisitButton] = useState(true);


    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)


    /**
     * Loads in current user
     */
    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)


        if (currentUser !== null) {
            if (currentUser.uid === state.recipe.userID) {
                setShowEditButton(true)
                setShowVisitButton(false)
            }
        } 
    })
    /**
     * Sets recipe from received props value. Only runs once on first render.
     */
    useEffect(() => {
        setRecipe([state.recipe])
        console.log(recipe)
        console.log(state.recipe)
        console.log(state.recipe.userID)
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

    const goToSeeProfile = async (userID) => {
        navigate("/seeProfile", {state: {userID: userID}})
    }

    const handleDelete = async () => {
        if (window.confirm("Er du sikker på at du ønsker å slette oppskriften din? Denne handlingen kan ikke angres.")) {
            await deleteDoc(doc(db, "recipes", state.recipe.id));
            console.log("Oppskriften ble slettet!")
            goToProfilePage()
        }
        console.log("Oppskriften ble slettet")
    }

    const handleVisit = async () => {
        goToSeeProfile(state.recipe.userID)
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
                            title={recipe.title}
                            timeEstimate={recipe.timeEstimate}
                            portions={recipe.portions}
                            nameOfUser={recipe.nameOfUser}
                            category={recipe.category}
                            ratings={recipe.ratings}
                            imageUrl={recipe.imageUrl}
                            id={recipe.id}
                            date={recipe.date}
                            likes={recipe.likes}
                            favoritedByUser={recipe.favoritedByUser}
                            style={{margin: "10rem"}}
                            key={recipe.id}
                        />
                        <IngredientList
                            key={recipe.id + "ingredients"}
                            ingredients={recipe.ingredients}
                        />
                        <Card>
                            <Card.Body>

                                <Card.Title>Vurder denne oppskriften</Card.Title>
                                <Rating onClick={handleRating} ratingValue={rating}/>
                            </Card.Body>
                        </Card>
                        <Card style={{width: "83rem"}}>
                            <Card.Body>
                                <Card.Title>Fremgangsmåte: </Card.Title>
                                <Card.Text>
                                    {recipe.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div>
                            <div>{showEditButton ?
                                <button onClick={handleEdit}>Rediger oppskrift</button> : null}</div>
                            <div>{showEditButton ?
                                <button onClick={handleDelete}>Slett oppskrift</button> : null}</div>
                             <div>{showVisitButton ?
                                <button onClick={handleVisit}>Besøk profil</button> : null}</div>
                        </div>
                    </div>
                )
            })}

        </div>


    )
}

export default RecipePage;