import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import ProfilePage from "./components/dummy/profilePage";
import NewRecipe from "./components/newRecipe/newRecipe";
import Navbar from "./components/navbar/navbar";
import SplashPage from "./components/dummy/splashPage";
import Signup from "./components/registration/signup";
import Login from "./components/registration/login";
import ForgotPassword from "./components/registration/forgotPassword";
import RecipeFeed from "./components/recipeFeed/recipeFeed";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipePage from "./components/recipePage/recipePage";
import Recipes from "./components/dummy/recipes";


const rootElement = document.getElementById("root");
render(
<BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/*" element={<App/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgotPassword" element={<ForgotPassword/>}/>
        <Route path="splashPage" element={<SplashPage/>}/>
        <Route path="recipes" element={<Recipes/>}/>
        <Route path="profilePage" element={<ProfilePage/>}/>
        <Route path="newRecipe" element={<NewRecipe/>}/>
        <Route path="displayRecipe" element={<RecipePage />} />
        <Route path="oppskrifter" element={<RecipeFeed/>}/>
        <Route path={"*"} element={<h1> 404: not found</h1>}/>
    </Routes>
</BrowserRouter>, rootElement);