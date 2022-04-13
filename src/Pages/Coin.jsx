import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from '../components/nav';
import ChartLine from '../components/chart';



const Coin = ({addFavCoin, favCoin}) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState();

    async function fetchData() {
        setLoading(true);
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        setCoin(data);
        setTimeout(() => {
            setLoading(false);
          }, 600);
    }

    function addCointoFav(){
        coin.map(item => addFavCoin(item));
    }

    function coinAllreadyFav() {
        return favCoin.find(item => item.id == id)
    }

    useEffect(() => {
        fetchData();
    }, [id, setCoin]);

    return (
        <div className="row">
            <Nav />
            <div className='coin-data'>
                    <div className="coin-name background">
                        <div className='coin-rank'>
                        {
                            loading ? 
                            coin.map(item => (
                                <span key={item.id} className='skeleton-rank'></span>
                            ))
                            :
                            coin.map(item => (
                                <span key={item.id} className='coin-rank'>Rank #{item.market_cap_rank}</span>
                            ))
                        }
                        </div>
                        {
                            loading ?
                            coin.map(item => (
                                <div key={item.id}>
                                    <div className='skeleton-para'/>
                                        <div className='skeleton-coin'>
                                            <h3></h3>
                                            <h1></h1>
                                        </div>
                                        <small className='skeleton-para'></small> 
                                    </div>
                            ))
                            :
                            coin.map(item => (
                                <div className="coin-price" key={item.id}>
                                    <img className='coin-img' src={item.image}/>
                                        <div className="left">
                                            <h3>{item.name} ({item.symbol})</h3>
                                            <h1>${item.current_price}</h1>
                                        </div>
                                        <small className='text-muted'>1.000000 {item.symbol}</small> 
                                </div>
                            ))
                        }
                         <div className='save-coin'>
                            { loading ?
                            <h3 className='skeleton-save'></h3>
                            :
                            coinAllreadyFav() ? <h3>Coin Saved</h3> : <h3 onClick={addCointoFav}>Save this Coin</h3>
                            }
                        </div>
                    </div>
                    <div className="coin-info background">
                    <FontAwesomeIcon icon="fas fa-backward" onClick={() => navigate('/coins')}/>
                    <h1>Go back to Coin List
                    </h1>
                    </div>
                </div>
                <div className="coin-char">
                    <div className="coin-char-data background">
                        <ChartLine coinname={id}/>
                    </div>
                    <div className="coin-info-data background">
                        {
                            loading ?
                            coin.map(item => (
                                    <table key={item.id} className='coin-table-info'>
                                        <thead>
                                            <tr>
                                                <td className='coin-info-bold'>Coin Informations:</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr  className='skeleton-table-info'>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                ))
                            :
                            coin.map(item => 
                                    <table key={item.id} className='coin-table-info'>
                                        <thead>
                                            <tr>
                                                <td className='coin-info-bold'>Coin Informations:</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Name:</td>
                                                <td>{item.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Symbol:</td>
                                                <td>{item.symbol}</td>
                                            </tr>
                                            <tr>
                                                <td>Rank:</td>
                                                <td>{item.market_cap_rank}</td>
                                            </tr>
                                            <tr>
                                                <td>High 24h:</td>
                                                <td>{item.high_24h || 0}</td>
                                            </tr>
                                            <tr>
                                                <td>Low 24h</td>
                                                <td>{item.low_24h || 0}</td>
                                            </tr>
                                            <tr>
                                                <td>Market Cap:</td>
                                                <td>{item.market_cap || 0}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Supply:</td>
                                                <td>{item.total_supply || 0}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Volume:</td>
                                                <td>{item.total_volume || 0}</td>
                                            </tr>
                                            <tr>
                                                <td>Price Change:</td>
                                                <td>{item.price_change_24h || 0}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                            )
                        }
                    </div>
                </div>
            </div>

    );
}

export default Coin;
