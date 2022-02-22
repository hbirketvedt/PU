import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Recipes from "./components/dummy/recipes";
import ProfilePage from "./components/profile/profilePage";
import EditProfile from "./components/profile/editProfile";

import ChangeProfilePicture from "./components/profile/changeProfilePicture";
import ChangePassword from "./components/profile/changePassword";
import ChangeBio from "./components/profile/changeBio";
import DeleteUser from "./components/profile/deleteUser";

import NewRecipe from "./components/newRecipe/newRecipe";
import Navbar from "./components/navbar/navbar";
import SplashPage from "./components/dummy/splashPage";
import Signup from "./components/registration/signup";
import Login from "./components/registration/login";
import ForgotPassword from "./components/registration/forgotPassword";
import RecipeFeed from "./components/recipeFeed/recipeFeed";


const rootElement = document.getElementById("root");
render(
<BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/*" element={<App/>}></Route>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgotPassword" element={<ForgotPassword/>}/>
        <Route path="splashPage" element={<SplashPage/>}/>
        <Route path="recipes" element={<Recipes/>}/>
        <Route path="profilePage" element={<ProfilePage/>}/>
        <Route path="editProfile" element={<EditProfile/>}/>
        <Route path="changeBio" element={<ChangeBio/>}/>
        <Route path="changePassword" element={<ChangePassword/>}/>
        <Route path="changeProfilePicture" element={<ChangeProfilePicture/>}/>
        <Route path="newRecipe" element={<NewRecipe/>}/>
        <Route path="oppskrifter" element={<RecipeFeed/>}/>
        <Route path="deleteUser" element={<DeleteUser/>}/>
        <Route path={"*"} element={<h1> 404: not found</h1>}/>
    </Routes>
</BrowserRouter>, rootElement);