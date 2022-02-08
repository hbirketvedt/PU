import {NavLink} from "react-router-dom";
import "../css/handleliste.css"

function Navbar() {
    return(
        <div>
            <nav>
                <div>
                    <ul>
                        <li><NavLink to={"/"}>Home </NavLink></li>
                        <li><NavLink to='/recipes'>Recipes</NavLink></li>
                        <li><NavLink to='/profilePage'>Profile Page</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;