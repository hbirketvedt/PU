import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import RecipeCard from "./recipeCard";
import "./recipeFeed.scss"


function RecipeFeed(props) {
    // Constants used in function
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)

    /**
     * Loads recipes that are passed as props from parent element (MainRecipeFeed / PersonalRecipeFeed)
     */
    useEffect(() => {
        setRecipes(props.recipes)
        console.log(props.recipes)
    }, [props.recipes])


    /**
     * Navigates to /displayRecipe and passes clicked recipe as a prop to recipePage
     */
    const handleRecipeClicked = (recipe) => {
        navigate("/displayRecipe", {state: {recipe: recipe}})
    }


    const cardStyle = () => {
        if (this.state.hover) {
            return {backgroundColor: 'red'}
        } else {
            return {backgroundColor: 'blue'}
        }
    }

    const toggleHover = () => {
        setHover(!hover)
    }

    return (
        <div className={"container-1"}>
            {recipes.map((recipe) => {
                return (
                    <div onClick={() => handleRecipeClicked(recipe)} key={recipe.id + "1"}
                         className={"container-1 hovercontainer"}>
                        <RecipeCard
                            recipe={recipe}
                            key={recipe.id}
                            // style={{backgroundColor: "red"}}
                            onMouseEnter={toggleHover}
                            onMouseLeave={toggleHover}
                        />
                    </div>)

            })}
        </div>
    )

}

export default RecipeFeed