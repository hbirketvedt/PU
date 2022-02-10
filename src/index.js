import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Recipes from "./routes/recipes";
import ProfilePage from "./routes/profilePage";

const rootElement = document.getElementById("root");
render(<BrowserRouter>
    <Routes>
        <Route path="/*" element={<App/>}/>
        <Route path="recipes" element={<Recipes/>}/>
        <Route path="profilePage" element={<ProfilePage/>}/>
        <Route path={"*"} element={<h1> 404: not found</h1>}/>
    </Routes>
</BrowserRouter>, rootElement);
