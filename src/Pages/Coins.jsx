import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from '../components/nav';
import Gainerloser from '../components/GainerLoser';

const Coins = () => {

    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    var maxPriceChanged = 0;
    var minPriceChanged = 0;
    const [loading, setLoading] = useState();
    const [maxCoin, setMaxCoin] = useState([]);
    const [minCoin, setMinCoin] = useState([]);

    async function fetchData() {
        setLoading(true);
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        setCoins(data);

        // Getting Gainer Coin

        data.map(item => item.price_change_percentage_24h > maxPriceChanged ? (maxPriceChanged = item.price_change_percentage_24h) : '');
        setMaxCoin(data.filter(item => item.price_change_percentage_24h == maxPriceChanged));

        // Getting Loser Coin

        data.map(item => item.price_change_percentage_24h < minPriceChanged ? (minPriceChanged = item.price_change_percentage_24h) : '');
        setMinCoin(data.filter(item => item.price_change_percentage_24h == minPriceChanged));

        setTimeout(() => {
            setLoading(false);
        }, 600);
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className='row'>
                <Nav />
                <Gainerloser maxCoin={maxCoin} minCoin={minCoin} loading={loading} />
                <div className="cryptocurrency-prices coins">
                    <h2>Cryptocurrency Prices by Market Cap</h2>
                    <div className="AllCoins--center">
                        <div className="AllCoins__wrapper coins-page background--blocks">
                            {
                                loading ? coins.sort((a, b) => a - b).map(item => (
                                    <div key={item.id} className="skeleton__loading"></div>
                                ))
                                    :

                                    coins.sort((a, b) => a - b).map(item => (
                                        <div key={item.id} className="AllCoin__block" onClick={() => navigate(`/coins/${item.id}`)}>
                                            <div className="AllCoin__para style-para">
                                                <figure className='AllCoin__img--wrapper'>
                                                    <img className='AllCoin__img' src={item.image} alt="" />
                                                </figure>
                                                <div className="AllCoin__name style-name">
                                                    <span>{item.name}</span>
                                                    <p>{item.symbol}</p>
                                                </div>
                                            </div>
                                            <div className="AllCoin__supply style-supply">
                                                {item.total_supply == null ? <p>-</p> : item.total_supply}
                                            </div>
                                            <div className="AllCoin__volume style-volume">
                                                {item.total_volume}
                                            </div>
                                            <div className="AllCoin__Price--para">
                                                <p className='AllCoin__Price'>${Math.floor(item.current_price)}</p>
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
                </div>
            </div>
        </>
    );
}

export default Coins;
