import RecipeCard from "../recipeFeed/recipeCard";
import {useEffect, useState} from "react";
import IngredientList from "./ingredientList";
import {Card} from "react-bootstrap";
import {useLocation} from "react-router";
import "./recipePage.scss"
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../../firebase_config";
import {collection, DocumentReference, getDocs} from "firebase/firestore";
import {Alert} from "react-bootstrap";
import {doc, deleteDoc} from "firebase/firestore";
import {useNavigate} from "react-router";
import OldNewRecipe from "../newRecipe/oldNewRecipe";
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function RecipePage(props) {
    const usersCollectionRef = collection(db, "users")
    // const documentID = "bnlYw69QnfYJREjRM3ud"
    // const recipesCollectionRef = collection(db, "recipes");
    // Had to use an empty array to create child react elements, or else they get set to null
    const [recipe, setRecipe] = useState([])
    const {state} = useLocation()
    const [currentUser, setCurrentUser] = useState({})
    const [editButton, setEditButton] = useState("")
    const [showEditButton, setShowEditButton] = useState(false)
    const [showEditor, setShowEditor] = useState(false);

    const navigate = useNavigate();


    /**
     * Loads in current user
     */
    onAuthStateChanged(auth, (currentUser) => {
        console.log(state.recipe.userID)
        console.log(currentUser.uid)
        if (currentUser.uid.localeCompare(state.recipe.userID)) {
            setShowEditButton(true)
        }

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

    return (
        <div>

            {recipe.map(recipe => {
                return (
                    <div key={recipe.id + "1"} className={"container-1"}>
                        {/*Editor that loads all current values as props in the newRecipe element. Hidden until user
                        starts editing the current recipe.
                        */}
                        <Modal open={showEditor} onClose={onCloseModal}>
                            <div>{showEditor ?
                                <OldNewRecipe
                                    recipeName={recipe.title}
                                    timeEstimate={recipe.timeEstimate}
                                    portions={recipe.portions}
                                    image={recipe.image}
                                    ingredients={recipe.ingredients}
                                    category={recipe.category}
                                    description={recipe.description}
                                /> : null}
                            </div>
                        </Modal>
                        <RecipeCard
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            imageUrl={recipe.imageUrl}
                            time={recipe.timeEstimate}
                            portions={recipe.portions}
                            name={recipe.nameOfUser}
                            style={{margin: "10rem"}}
                            key={recipe.id}
                        />
                        <IngredientList
                            key={recipe.id + "ingredients"}
                            ingredients={recipe.ingredients}
                        />
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