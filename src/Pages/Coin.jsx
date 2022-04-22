import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from '../components/nav';
import ChartLine from '../components/chart';



const Coin = ({ addFavCoin, favCoin }) => {


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
        console.log(data)
    }

    function addCointoFav() {
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
            <div className="c__wrapper">
                <div className="c__back">
                    <span className='c__a' onClick={() => navigate('/coins')}>
                        All Coins
                    </span>
                    <FontAwesomeIcon icon="fa-solid fa-angle-right c__back-icn" />
                    {
                        coin.map(item =>
                            <span className='c__n' key={item.id}>
                                {item.name}
                            </span>
                        )
                    }
                </div>
                {
                    coin.map(item =>
                        <div className="c__all" key={item.id}>
                            <div className="c__all-title">
                                <figure className="c__logo">
                                    <img src={item.image} alt="" />
                                </figure>
                                <div className="c__title">
                                    <div className="c__name">
                                        {item.name}
                                    </div>
                                    <div className="c__symbol">
                                        ({item.symbol})
                                    </div>
                                </div>
                            </div>
                            <div className="c__all-price">
                                <span>$</span>{item.current_price}
                            </div>
                        </div>
                    )
                }
                <div className="c__chart--wrapper">
                    <div className='c__chart'>
                        <ChartLine coinname={id} />
                    </div>
                </div>
                <div className="market__stats">
                    <h3>Market stats</h3>
                </div>
                {
                    coin.map(item =>
                        <div className="c__market--stats" key={item.id}>
                            <div className="c__stat">
                                <span>Market cap</span>
                                <p className='c__stat--text'>{item.market_cap}</p>
                            </div>
                            <div className="c__stat">
                                <span>Volume (24h)</span>
                                <p className='c__stat--text'>{item.total_volume}</p>
                            </div>
                            <div className="c__stat">
                                <span>Circulating Supply</span>
                                <p className='c__stat--text'>{item.circulating_supply}</p>
                            </div>
                            <div className="c__stat">
                                <span>Total Supply</span>
                                {item.total_supply == null ?
                                    <p className='c__stat--text'> - </p>
                                    :
                                    <p className='c__stat--text'>{item.total_supply}</p>
                                }
                            </div>
                            <div className="c__stat">
                                <span>Current Price</span>
                                <p className='c__stat--text'>{item.current_price}</p>
                            </div>
                            <div className="c__stat">
                                <span>Highest Price (24h)</span>
                                <p className='c__stat--text'>{item.high_24h}</p>
                            </div>
                            <div className="c__stat">
                                <span>Price Change (24h)</span>
                                {(item.price_change_percentage_24h) > 0 ?
                                    <p className='grn'>{item.price_change_percentage_24h}%</p>
                                    :
                                    <p className='red'>{item.price_change_percentage_24h}%</p>
                                }
                            </div>
                            <div className="c__stat">
                                <span>Market Cap Change (24h)</span>
                                {item.market_cap_change_percentage_24h > 0 ?
                                    <p className='grn'>{item.market_cap_change_percentage_24h}%</p>
                                    :
                                    <p className='red'>{item.market_cap_change_percentage_24h}%</p>
                                }
                            </div>
                        </div>)
                }
                <div className="c__save">
                    {
                        coinAllreadyFav() ? <a className='c__btn c__saved'>Coin Saved</a> : <a className='c__btn' onClick={addCointoFav}>Save Coin</a>
                    }
                    
                </div>
            </div>
        </div>

    );
}

export default Coin;
