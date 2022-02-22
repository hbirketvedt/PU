import FrontPage from "./components/registration/frontpage";
import "./css/app.scss"
import Navbar from "./components/navbar/navbar";
import Login from "./components/registration/login";
import Signup from "./components/registration/signup";
import ForgotPassword from "./components/registration/forgotPassword";
import SplashPage from "./components/dummy/splashPage";
import Recipes from "./components/dummy/recipes";
import ProfilePage from "./components/dummy/profilePage";
import NewRecipe from "./components/newRecipe/newRecipe";
import RecipePage from "./components/recipePage/recipePage";
import RecipeFeed from "./components/recipeFeed/recipeFeed";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<FrontPage/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="forgotPassword" element={<ForgotPassword/>}/>
                <Route path="splashPage" element={<SplashPage/>}/>
                <Route path="recipes" element={<Recipes/>}/>
                <Route path="profilePage" element={<ProfilePage/>}/>
                <Route path="newRecipe" element={<NewRecipe/>}/>
                <Route path="displayRecipe" element={<RecipePage/>}/>
                <Route path="oppskrifter" element={<RecipeFeed/>}/>
                <Route path={"*"} element={<h1> 404: not found</h1>}/>
            </Routes>
        </div>
    )
}

export default App;