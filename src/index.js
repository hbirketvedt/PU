import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Recipes from "./components/dummy/recipes";
import ProfilePage from "./components/profile/profilePage";
import NewRecipe from "./components/newRecipe/newRecipe";
import Navbar from "./components/navbar/navbar";
import AddIngredients from "./components/newRecipe/addIngredients";
import RecipePage from "./components/recipe/recipePage";

const rootElement = document.getElementById("root");
render(<BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/*" element={<App/>}/>
        <Route path="recipes" element={<Recipes/>}/>
        <Route path="profilePage" element={<ProfilePage/>}/>
        <Route path="newRecipe" element={<NewRecipe/>}/>
        <Route path="ingredients" element={<AddIngredients/>}/>
        <Route path="hamburger" element={<RecipePage/>}/>
        <Route path={"*"} element={<h1> 404: not found</h1>}/>
    </Routes>
</BrowserRouter>, rootElement);
