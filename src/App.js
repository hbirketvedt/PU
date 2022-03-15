import {
    Routes,
    Route
} from "react-router-dom";
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
import ProtectedRoutes from "./ProtectedRoutes";
import LoggedInRoutes from "./LoggedInRoutes";
import FrontPage from "./components/registration/frontpage";
import "./css/app.scss"
import RecipePage from "./components/recipePage/recipePage";
import MainRecipeFeed from "./components/recipeFeed/mainRecipeFeed";
import Users from "./components/admin/users";

function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<SplashPage/>}/>
                <Route element={<LoggedInRoutes/>}>
                    <Route path="frontpage" element={<FrontPage/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="frontpage/login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="frontpage/signup" element={<Signup/>}/>
                    <Route path="forgotPassword" element={<ForgotPassword/>}/>
                </Route>
                <Route path="splashPage" element={<SplashPage/>}/>
                <Route path="displayRecipe" element={<RecipePage/>}/>
                <Route path="editProfile" element={<EditProfile/>}/>
                <Route path="changeBio" element={<ChangeBio/>}/>
                <Route path="changePassword" element={<ChangePassword/>}/>
                <Route path="changeProfilePicture" element={<ChangeProfilePicture/>}/>
                <Route path="oppskrifter" element={<MainRecipeFeed/>}/>
                <Route path="deleteUser" element={<DeleteUser/>}/>
                <Route path="users" element={<Users/>}/>
                <Route path={"*"} element={<h1> 404: not found</h1>}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="profilePage" element={<ProfilePage/>}/>
                    <Route path="newRecipe" element={<NewRecipe/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App;
