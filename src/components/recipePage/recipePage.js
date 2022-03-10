import RecipeCard from "../recipeFeed/recipeCard";
import {useEffect, useState} from "react";
import IngredientList from "./ingredientList";
import {Card} from "react-bootstrap";
import {useLocation} from "react-router";
import "./recipePage.scss"
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../../firebase_config";
import {collection, getDocs} from "firebase/firestore";

function RecipePage() {
    const usersCollectionRef = collection(db, "users")
    // const documentID = "bnlYw69QnfYJREjRM3ud"
    // const recipesCollectionRef = collection(db, "recipes");
    // Had to use an empty array to create child react elements, or else they get set to null
    const [recipe, setRecipe] = useState([])
    const {state} = useLocation()
    const [currentUser, setCurrentUser] = useState({})
    const [editButton, setEditButton] = useState("")
    const [show, setShow] = useState(false)


    /**
     * Loads in current user
     */
    onAuthStateChanged(auth, (currentUser) => {
        console.log(state.recipe.userID)
        console.log(currentUser.uid)
        if (currentUser.uid.localeCompare(state.recipe.userID)) {
            setShow(true)
        }

    })


    /**
     * Sets recipe from received props value. Only runs once on first render.
     */
    useEffect(() => {
        setRecipe([state.recipe])
    }, [])

    const handleEdit = () => {
      console.log("hei")
    }


    return (
        <div>
            {recipe.map(recipe => {
                return (
                    <div key={recipe.id + "1"} className={"container-1"}>
                        <div>{ !show ? <button onClick={handleEdit}>Rediger oppskrift</button> : null }</div>
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
                    </div>
                )
            })}
        </div>

    )
}

export default RecipePage;