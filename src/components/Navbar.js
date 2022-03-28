import React from 'react';
//import "./Navbar.css"
import { Link } from "react-router-dom";
// get our fontawesome imports
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Navbar = () => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <FontAwesomeIcon icon={faCode} /> Bar Calculator

            </h1>
            <ul >
                <li>
                    <Link to="/">Etusivu</Link>
                </li>
                <li>
                    <Link to="/barchart">Laskenta</Link>
                </li>
                <li>
                    <Link to="/info">Info</Link>
                </li>
            </ul>

        </nav>



    );
}
export default Navbar;