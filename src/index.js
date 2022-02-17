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
import RecipeFeed from "./components/recipeFeed/recipeFeed";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipePage from "./components/recipePage/recipePage";

const rootElement = document.getElementById("root");
render(<BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/*" element={<App/>}/>
        <Route path="profilePage" element={<ProfilePage/>}/>
        <Route path="newRecipe" element={<NewRecipe/>}/>
        <Route path="displayRecipe" element={<RecipePage />} />
        <Route path="oppskrifter" element={<RecipeFeed/>}/>
        <Route path={"*"} element={<h1> 404: not found</h1>}/>
    </Routes>
</BrowserRouter>, rootElement);
