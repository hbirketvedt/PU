import {NavLink} from "react-router-dom";

function Navbar() {
    return(
        <div className={"navbar"}>
            <nav >
                <div>
                    <ul>
                        <li className={"nav-li"}><NavLink to={"/"}>Home </NavLink></li>
                        <li className={"nav-li"}><NavLink to='/recipes'>Recipes</NavLink></li>
                        <li className={"nav-li"}><NavLink to='/profilePage'>Profile Page</NavLink></li>
                        <li className={"nav-li"}><NavLink to='/newRecipe'>Add new recipe</NavLink></li>
                        <li className={"nav-li"}><NavLink to='/oppskrifter'>Oppskrifter</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;