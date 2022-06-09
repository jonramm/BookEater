import React from "react";
import mainLogo from '../assets/Official-Logo-And-GIF.png'
import titleImg from '../assets/BookEater-Logo.png'
import menuLogo from '../assets/menu-logo.png'
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Header = (props) => {
    
    const logout = useLogout()

    return (
        <div className="">
            {/* <nav class="navbar navbar-light bg-light py-1">
                <a class="navbar-brand" href="/"><img className='nav-logo' src={mainLogo} alt='BookEater Logo' /></a>
                <div className='navbar-nav'>
                    <p className='nav-item'>location: Santa Fe, NM</p>
                </div>
            </nav> */}
            <nav class="navbar navbar-expand-lg">
                <div className='nav-item nav-left'>
                    <img className='nav-logo' src={mainLogo} alt='BookEater Logo' />
                    <p className='nav-greeting' >Hi, {props.headerProps.fName}!</p>
                </div>
                <div className='nav-item user-info'>
                    <p><strong>Location:</strong> Santa Fe, NM</p>
                    <p><strong>Favorite Bookstore:</strong> Blue Cypress, New Orleans, LA</p>
                    <p><strong>Favorite Book:</strong> East of Eden, John Steinbeck</p>
                    <p><strong>Quote:</strong> "He tried." - Breakfast of Champions, Vonnegut</p>
                </div>
                <div className='nav-item nav-right'>
                    <img className='nav-title' src={menuLogo} alt='BookEater Title' />
                    <button className='btn btn-sm btn-primary btn-block nav-signout' onClick={logout}>Sign Out</button>
                    <Link className='users-link' to='/users'>Users</Link>
                </div>
            </nav>
        </div>
    )
}

export default Header