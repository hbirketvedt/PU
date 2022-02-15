import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav>
                <div>
                    <ul className={"navbar"}>
                        <NavLink to={"/"}>Home </NavLink>
                        <NavLink to='/recipes'>Recipes</NavLink>
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