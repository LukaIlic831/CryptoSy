import React from 'react';
import Profileimg from "../assets/me.svg";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";

const Nav = () => {

    const navigate = useNavigate();

    function openMenu(){
        document.querySelector(".mobile__menu").classList += " open__mobile--menu"; 
    }

    function closeMenu(){
        document.querySelector(".mobile__menu").classList.remove("open__mobile--menu"); 
    }

    return (
        <>
         <section id="navigation">
                <nav>
                    <div className='logo__wrapper' onClick={() => navigate('/')}>
                        <figure>
                            <img src={logo} alt="" />
                        </figure>
                        <h2>CryptoSy</h2>
                    </div>
                    <div className="nav__profile">
                    <ul className='nav__list'>
                        <li className='nav__link' onClick={() => navigate('/')}>Home</li>
                        <li className='nav__link' onClick={() => navigate('/coins')}>All Coins</li>
                        <li className='nav__link' onClick={() => navigate('/favoritecoins')}>Favorite Coins</li>
                    </ul>
                    <FontAwesomeIcon icon="fa-solid fa-bars" onClick={openMenu} />
                    <div className="mobile__menu">
                    <FontAwesomeIcon icon="fa-solid fa-xmark"  onClick={closeMenu} />
                        <ul className="mobile__menu--list">
                        <li className='mobile__menu--link' onClick={() => {navigate('/'); closeMenu()}}>Home</li>
                        <li className='mobile__menu--link' onClick={() => {navigate('/coins'); closeMenu()}}>All Coins</li>
                        <li className='mobile__menu--link' onClick={() => {navigate('/favoritecoins'); closeMenu()}}>Favorite Coins</li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </section>  
        </>
    );
}

export default Nav;
