import React, { useContext } from "react";
import mainLogo from '../assets/Official-Logo-And-GIF.png'
import logoImg from '../assets/logo-img.png'
import menuLogo from '../assets/menu-logo.png'
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthProvider'
import location from '../assets/location.png'
import favBookstore from '../assets/favBookstore.png'
import favBook from '../assets/favBook.png'
import quote from '../assets/quote.png'

const Header = (props) => {

    const logout = useLogout()
    const { auth, setAuth } = useContext(AuthContext)

    return (
        <nav class="navbar navbar-expand-sm">
            <div className='nav-item'>
                <Link className='logo-home-link' to='/'><img className='nav-logo' src={logoImg} alt='BookEater Logo' /></Link>
            </div>
            <div className="nav-item">
                <p className='nav-greeting' >{props.headerProps.fName}</p>
            </div>
            {/* <div className='nav-item user-info'>
                {props.headerProps.location 
                            ? <p className='user-info-line'><strong>Location:</strong> {props.headerProps.location}</p>
                            : <Link to='/preferences'>Add your location!</Link>
                        }
                {props.headerProps.bookstore
                            ? <p className='user-info-line'><strong>Favorite Bookstore:</strong> {props.headerProps.bookstore}</p>
                            : <Link to='/preferences'>Add your favorite bookstore!</Link>
                        }
                {props.headerProps.favBook
                            ? <p className='user-info-line'><strong>Favorite Book:</strong> {props.headerProps.favBook}</p>
                            : <Link to='/preferences'>Add your favorite book!</Link>
                        }
                {props.headerProps.quote
                            ? <p className='user-info-line'><strong>Quote:</strong> {props.headerProps.quote}</p>
                            : <Link to='/preferences'>Add your favorite quote!</Link>
                        }
            </div> */}
            <div className="nav-item icon-container">
                <img className="nav-item header-icons" src={location} />
                <img className="nav-item header-icons" src={favBookstore} />
                <img className="nav-item header-icons" src={favBook} />
                <img className="nav-item header-icons" src={quote} />
            </div>
            <div className='nav-item'>
                <div className="dropleft">
                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className='nav-title' src={menuLogo} alt='BookEater Title' />
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" to="/">Home</Link>
                        <Link className="dropdown-item" to="/library">Library</Link>
                        <Link className="dropdown-item" to="/preferences">Preferences</Link>
                        <Link className="dropdown-item" to='/about'>About</Link>
                        {auth.roles.includes(1)
                            ? <Link className='dropdown-item' to='/users'>Users</Link>
                            : null
                        }
                        <Link onClick={logout} className="dropdown-item" to="/">Sign Out</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header