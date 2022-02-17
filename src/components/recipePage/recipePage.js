import RecipeCard from "../recipeFeed/recipeCard";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase_config";
import IngredientList from "./ingredientList";
import {Card} from "react-bootstrap";
import {useLocation} from "react-router";

function RecipePage() {
    // const documentID = "bnlYw69QnfYJREjRM3ud"
    const recipesCollectionRef = collection(db, "newRecipes");
    // Had to use an empty array to create child react elements, or else they get set to null
    const [recipe, setRecipe] = useState([])
    const {state} = useLocation()


    /**
     * Loads recipe from database once when page is loaded
     */
    useEffect(() => {
        const documentID = state.id
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            setRecipe([data.docs.find((doc) => doc.id === documentID).data()])
        };
        loadRecipes();
        console.log("Database polled");
    }, []);

    const check = () => {
        console.log(recipe.title)
    }


    return (
        <div>
            {recipe.map(recipe => {
                return (
                    <div>
                        <h1 className={"centered_text h1__margin"}> {recipe.title}</h1>
                        <div className={"columns"}>
                            <RecipeCard
                                id={recipe.id}
                                title={recipe.title}
                                description={recipe.description}
                                imageUrl={recipe.imageUrl}
                                time={recipe.timeEstimate}
                                portions={recipe.portions}
                                style={{margin: "10rem"}}
                            />
                            <IngredientList
                                ingredients={recipe.ingredients}
                            />
                        </div>
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