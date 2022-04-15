import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const FourCoins = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState();

    async function fetchData() {
        setLoading(true);
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        setCoins(data);
        setTimeout(() => {
            setLoading(false);
        }, 600);
    }

   

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <div className='row'>
            <div className="cryptocurrency-prices">
                <div className="cryptocurrency-pricesTitle">
                    <h2>Cryptocurrency Prices</h2>
                </div>
                <div className="AllCoins--center">
                    <div className="AllCoins__wrapper background--blocks">
                        {
                            loading ? coins.sort((a, b) => a - b).slice(0, 4).map(item => (
                                <div key={item.id} className="skeleton__loading"></div>
                            ))
                                :
                                
                                    coins.sort((a, b) => a - b).slice(0, 4).map(item => (
                                        <div key={item.id} className="AllCoin__block fourCoinsBlock" onClick={() => navigate(`/coins/${item.id}`)}>
                                            <div className="AllCoin__para">
                                                <figure className='AllCoin__img--wrapper'>
                                                    <img className='AllCoin__img' src={item.image} alt="" />
                                                </figure>
                                                <div className="AllCoin__name">
                                                    <span>{item.name}</span>
                                                    <p>{item.symbol}</p>
                                                </div>
                                            </div>
                                            <div className="AllCoin__Price--para">
                                                <p className='AllCoin__Price'>${item.current_price}</p>
                                                {item.price_change_percentage_24h > 0 ?
                                                    <span className='green-perc'>{item.price_change_percentage_24h}%</span>
                                                    :
                                                    <span className='red-perc'>{item.price_change_percentage_24h}%</span>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                    </div>
                </div>
                <a href="#" className='show-all' onClick={() => navigate('/coins')}>Show All</a>
            </div>
        </div>

    );
}

export default FourCoins;
