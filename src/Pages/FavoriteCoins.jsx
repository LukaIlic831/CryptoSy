import React from 'react';
import Nav from '../components/nav';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Favoritecoins = ({ favCoins, removeCoin }) => {

    const navigate = useNavigate();
    function removeThisCoin() {
        favCoins.map(item => removeCoin(item.id))
    }



    
    return (
        <div>
            <Nav />
            <div className='row'>
                <div className="favorite-coins">
                    <h2>Favorite Coins</h2>
                    <div className="AllCoins--center">
                        <div className="AllCoins__wrapper coins-page background--blocks">
                        <div className="AllCoin__block">
                                    <div className="AllCoin__para style-para">
                                        <h3>Coin Name</h3>
                                    </div>
                                    <div className="AllCoin__supply style-supply">
                                        <h3>Coin Total Supply</h3>
                                    </div>
                                    <div className="AllCoin__volume style-volume">
                                       <h3>Coin Total Volume</h3>
                                    </div>
                                    <div className="AllCoin__Price--para">
                                        <h3>Coin Price</h3>
                                    </div>
                                    <div className="remove-coin remove">
                                        <h3>Remove Coin</h3>
                                    </div>
                                </div>
                            {favCoins.map(item => (
                                <div key={item.id} className="AllCoin__block">
                                    <div className="AllCoin__para style-para" onClick={() => navigate(`/coins/${item.id}`)}>
                                        <figure className='AllCoin__img--wrapper'>
                                            <img className='AllCoin__img' src={item.image} alt="" />
                                        </figure>
                                        <div className="AllCoin__name style-name">
                                            <span>{item.name}</span>
                                            <p>{item.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="AllCoin__supply style-supply" onClick={() => navigate(`/coins/${item.id}`)}>
                                        {item.total_supply == null ? <p>-</p> : item.total_supply}
                                    </div>
                                    <div className="AllCoin__volume style-volume" onClick={() => navigate(`/coins/${item.id}`)}>
                                        {item.total_volume}
                                    </div>
                                    <div className="AllCoin__Price--para" onClick={() => navigate(`/coins/${item.id}`)}>
                                        <p className='AllCoin__Price'>${Math.floor(item.current_price)}</p>
                                        {item.price_change_percentage_24h > 0 ?
                                            <span className='green-perc'>{item.price_change_percentage_24h}%</span>
                                            :
                                            <span className='red-perc'>{item.price_change_percentage_24h}%</span>
                                        }
                                    </div>
                                    <div className="remove-coin" onClick={removeThisCoin}>
                                        Remove
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favoritecoins;


