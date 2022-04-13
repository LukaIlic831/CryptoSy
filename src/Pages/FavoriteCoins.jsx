import React from 'react';
import Nav from '../components/nav';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const Favoritecoins = ({favCoins, removeCoin}) => {

    const navigate = useNavigate();
    function removeThisCoin(){
        favCoins.map(item => removeCoin(item.id))
    }

    return (
        <div>
            <Nav/>
            <div className='row'>
            <div className="favorite-coins">
                        <h2>Favorite Coins</h2>
                        <table className='table-coins'>
                            <thead>
                                <tr className='table-coins-row'>
                                    <th>Rank</th>
                                    <th>Coin Image</th>
                                    <th>Symbol</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Market Cap</th>
                                    <th>Remove Coin</th>
                                </tr>
                            </thead>
                            <tbody>
                               {

                                    favCoins.map(item => (
                                        <tr key={item.id} className='table-coins-row'>
                                        <td onClick={() => navigate(`/coins/${item.id}`)}>{item.market_cap_rank}</td>
                                        <td onClick={() => navigate(`/coins/${item.id}`)}><img className='coin-img' src={item.image}/> </td>
                                        <td onClick={() => navigate(`/coins/${item.id}`)}>{item.symbol}</td>
                                        <td onClick={() => navigate(`/coins/${item.id}`)}>{item.name}</td>
                                        <td onClick={() => navigate(`/coins/${item.id}`)}>${item.current_price}</td>
                                        <td onClick={() => navigate(`/coins/${item.id}`)}>${item.market_cap}</td>
                                        <td className='remove-coin' onClick={removeThisCoin}>Remove</td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
        </div>
            </div>
    );
}

export default Favoritecoins;


