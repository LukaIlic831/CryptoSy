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

        data.map(item =>  item.price_change_percentage_24h > maxPriceChanged ? (maxPriceChanged = item.price_change_percentage_24h) : ''); 
        setMaxCoin(data.filter(item => item.price_change_percentage_24h == maxPriceChanged));
        
        // Getting Loser Coin

        data.map(item =>  item.price_change_percentage_24h < minPriceChanged ? (minPriceChanged = item.price_change_percentage_24h) : ''); 
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
            <Gainerloser maxCoin = {maxCoin} minCoin = {minCoin} loading={loading}/>
                <div className="cryptocurrency-prices coins">
                    <h2>Cryptocurrency Prices by Market Cap</h2>
                    <table className='table-coins'>
                        <thead>
                            <tr className='table-coins-row'>
                                <th>Rank</th>
                                <th>Coin Image</th>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody className='table-coins-body'>
                            {

                                loading ?
                                coins.map(item => (
                                    <tr key={item.id}>
                                        <td className='skeleton-table-row'></td>
                                        <td className='skeleton-table-row'></td>
                                        <td className='skeleton-table-row'></td>
                                        <td className='skeleton-table-row'></td>
                                        <td className='skeleton-table-row'></td>
                                        <td className='skeleton-table-row'></td>
                                    </tr>
                                ))
                                :
                                coins.sort((a, b) => a - b).map(item => (
                                    <tr key={item.id} className='table-coins-row' onClick={() => navigate(`${item.id}`)}>
                                        <td>{item.market_cap_rank}</td>
                                        <td><img className='coin-img' src={item.image} /> </td>
                                        <td>{item.symbol}</td>
                                        <td>{item.name}</td>
                                        <td>${item.current_price}</td>
                                        <td>${item.market_cap}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
        </div>
        </>
    );
}

export default Coins;
