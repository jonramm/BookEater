import React, { useContext } from "react";
import mainLogo from '../assets/Official-Logo-And-GIF.png'
import logoImg from '../assets/Official-Logo-And-GIF-No-Title.png'
import menuLogo from '../assets/menu-logo.png'
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthProvider'

const Header = (props) => {

    const logout = useLogout()
    const { auth, setAuth } = useContext(AuthContext)

    return (

        <nav class="navbar navbar-expand-sm">
            <div className='nav-item nav-left'>
                <img className='nav-logo' src={logoImg} alt='BookEater Logo' />
                <p className='nav-greeting' >Hi, {props.headerProps.fName}!</p>
            </div>
            <div className='nav-item user-info'>
                <p className='user-info-line'><strong>Location:</strong> Santa Fe, NM</p>
                <p className='user-info-line'><strong>Favorite Bookstore:</strong> Blue Cypress, New Orleans, LA</p>  
                <p className='user-info-line'><strong>Favorite Book:</strong> East of Eden, John Steinbeck</p>
                <p className='user-info-line'><strong>Quote:</strong> "He tried." - Breakfast of Champions, Vonnegut</p>
            </div>
            <div className='nav-item nav-right'>
                <img className='nav-title' src={menuLogo} alt='BookEater Title' />
                {/* <button className='btn btn-sm btn-primary btn-block nav-signout' onClick={logout}>Sign Out</button>
                {auth.roles.includes(1)
                    ? <Link className='users-link' to='/users'>Users</Link>
                    : null
                } */}
            </div>
        </nav>
    )
}

export default Header