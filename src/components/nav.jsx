import React from 'react';
import Profileimg from "../assets/me.svg";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {

    const navigate = useNavigate();

    return (
        <>
         <section id="navigation">
                <nav>
                    <div className='logo__wrapper'>
                        <h2 onClick={() => navigate('/')}>CryptoSy</h2>
                    </div>
                    <div className="nav__profile">
                    <div className='favorite'>
                    <p>Favorite Coins</p>
                    <FontAwesomeIcon icon="fas fa-star" onClick={() => navigate('/favoritecoins')} />
                    </div>
                    <div className='para'>
                    <p>Hello David <br /> <span className='admin'>Admin</span></p>
                    </div>
                        <div className="nav__profile--img">
                            <img id="profile__img" src={Profileimg} alt="" />
                        </div>
                    </div>
                </nav>
            </section>  
        </>
    );
}

export default Nav;
