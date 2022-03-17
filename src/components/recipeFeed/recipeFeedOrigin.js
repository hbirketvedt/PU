import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {db} from "../../firebase_config";
import RecipeCard from "./recipeCard";
import "./recipeFeed.scss";

/*Foreløpig laget for å unngå at kategorier havner på profilPage. Mye gjenbruk av kode, så bør endres. Er akkurat samme 
funksjon og return som i recipeFeed */

function RecipeFeed(props) {
    // Constants used in function
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate()
    const [category, setCategory] = useState([]); //Array som fyller/tømmer seg når knappene er på/av

    const handleChange = e => { //fyller/tømmer category-array når en knapp blir slått på/av
        if (e.target.checked) {
            setCategory([...category, e.target.value]);
        } else {
            setCategory(category.filter(id => id !== e.target.value));
        }
    }

    useEffect(() => {
        if (category.length === 0) {
            setRecipes(props.recipes)
        } else {
            setRecipes( //går gjennom alle oppskriftene og filtrerer i forhold til hvilke kategorier som finnes i category.
                props.recipes.filter(categories =>
                    category.some(i => [categories.category].flat().includes(i))
                    )
            );
        }
    }, [category, props.recipes]) //props.recipes er inkludert fordi den vil laste inn alle oppskriftene første gangen. category er inkludert siden den oppdateres for hvert knappetrykk

    const handleRecipeClicked = (recipe) => {
        navigate("/displayRecipe", {state: {recipe: recipe}})
    }


return(
    <div className = "container-recipeFeedOrigin">
    {recipes.map((recipe) => {
        return (
            <div onClick={() => handleRecipeClicked(recipe)} key={recipe.id + "1"}>
                <RecipeCard
                    id={recipe.id}
                    title={recipe.title}
                    description={recipe.description}
                    imageUrl={recipe.imageUrl}
                    time={recipe.timeEstimate}
                    portions={recipe.portions}
                    category={recipe.category}
                    name={recipe.nameOfUser || "Ukjent"}
                    style={{margin: "10rem"}}
                    key={recipe.id}
                /></div>)
    })}
        </div>
)
}

export default RecipeFeed;
