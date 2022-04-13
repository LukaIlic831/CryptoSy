import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const FourCoins = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState();

    async function fetchData(){
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
                        <h2>Cryptocurrency Prices</h2>
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
                                 coins.slice(0,4).map(item => (
                                    <tr key={item.id}>
                                    <td className='skeleton-table-row'></td>
                                    <td className='skeleton-table-row'></td>
                                    <td className='skeleton-table-row'></td>
                                    <td className='skeleton-table-row'></td>
                                    <td className='skeleton-table-row'></td>
                                    <td className='skeleton-table-row'></td>
                                </tr>
                                ))  :
                                    coins.sort((a,b) => a-b).slice(0,4).map(item => (
                                        <tr key={item.id} className='table-coins-row' onClick={() => navigate(`/coins/${item.id}`)}>
                                        <td>{item.market_cap_rank}</td>
                                        <td><img className='coin-img' src={item.image}/> </td>
                                        <td>{item.symbol}</td>
                                        <td>{item.name}</td>
                                        <td>${item.current_price}</td>
                                        <td>${item.market_cap}</td>
                                    </tr>
                                    ))
                                }
                                
                                
                            </tbody>
                        </table>
                        <a href="#" className='show-all' onClick={() => navigate('/coins')}>Show All</a>
                    </div>
        </div>
        
    );
}

export default FourCoins;
