import React from "react";
import mainLogo from '../assets/Official-Logo-And-GIF.png'
import titleImg from '../assets/BookEater-Logo.png'



const Header = (headerProps) => {
    console.log("props: ", headerProps)
    return (
        <div className="">
            {/* <nav class="navbar navbar-light bg-light py-1">
                <a class="navbar-brand" href="/"><img className='nav-logo' src={mainLogo} alt='BookEater Logo' /></a>
                <div className='navbar-nav'>
                    <p className='nav-item'>location: Santa Fe, NM</p>
                </div>
            </nav> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div className='nav-item nav-left'>
                <img className='nav-logo' src={mainLogo} alt='BookEater Logo' />
                <p className='nav-greeting' >Hi, {headerProps.fName}!</p>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <div className='nav-item user-info'>
                            <p><strong>Location:</strong> Santa Fe, NM</p>
                            <p><strong>Favorite Bookstore:</strong> Blue Cypress, New Orleans, LA</p>
                            <p><strong>Favorite Book:</strong> East of Eden, John Steinbeck</p>
                            <p><strong>Quote:</strong> "He tried." - Breakfast of Champions, Vonnegut</p>
                        </div>
                        <div className='nav-item'>
                            <img className='nav-title' src={titleImg} alt='BookEater Title' />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header