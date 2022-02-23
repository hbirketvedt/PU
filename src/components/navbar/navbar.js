import {NavLink} from "react-router-dom";

function Navbar() {
    // Function for NavBar at top of every page. Add new NavLink to add new button to navbar. Must include new route
    // inside router in index.js for newly added NavLink to be functional.
    return (
        <div className={"sticky navbar__wrapper"}>
            <nav>
                <div>
                    <ul>
                        <NavLink to={"/"}>Home </NavLink>
                        <NavLink to='/frontpage'>Innlogging </NavLink>
                        <NavLink to='/profilePage'>Profile Page</NavLink>
                        <NavLink to='/newRecipe'>Add new recipe</NavLink>
                        <NavLink to='/oppskrifter'>Oppskrifter</NavLink>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;