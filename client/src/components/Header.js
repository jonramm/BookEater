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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const Header = (props) => {

    const logout = useLogout()
    const { auth, setAuth } = useContext(AuthContext)

    return (
        <nav class="navbar navbar-expand-sm shadow">
            <div className='nav-item'>
                <Link className='logo-home-link' to='/'><img className='nav-logo' src={logoImg} alt='BookEater Logo' /></Link>
            </div>
            <div className="nav-item">
                <p className='nav-greeting' >{props.headerProps.fName}</p>
            </div>
            <div className="nav-item icon-container">
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip>
                            Location:
                            {props.headerProps.location 
                            ? <p>{props.headerProps.location}</p>
                            : <p>Click above to add location!</p>
                        }
                        </Tooltip>
                    }
                >
                <Link to='/preferences'>
                    <img className="nav-item header-icons" src={location} />
                </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip>
                            Favorite Bookstore:
                            {props.headerProps.bookstore
                            ? <p>{props.headerProps.bookstore}</p>
                            : <p>Click above to add your favorite bookstore!</p>
                        }
                        </Tooltip>
                    }
                >
                <Link to='/preferences'>
                    <img className="nav-item header-icons" src={favBookstore} />
                </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip>
                            Favorite Book:
                            {props.headerProps.favBook
                            ? <p>{props.headerProps.favBook}</p>
                            : <p>Click above to add your favorite book!</p>
                        }
                        </Tooltip>
                    }
                >
                <Link to='/preferences'>
                    <img className="nav-item header-icons" src={favBook} />
                </Link>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip>
                            Favorite Book Quote:
                            {props.headerProps.quote
                            ? <p>{props.headerProps.quote}</p>
                            : <p>Click above to add your favorite book quote!</p>
                        }
                        </Tooltip>
                    }
                >
                <Link to='/preferences'>
                    <img className="nav-item header-icons" src={quote} />
                </Link>
                </OverlayTrigger>
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