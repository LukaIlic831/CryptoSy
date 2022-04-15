import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Insights = () => {

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

    function averageMarketCap(){
        var avgCap = 0, numOfCoins = 0;
        coins.map(item => (
            avgCap += item.market_cap_change_24h,
            numOfCoins++
        )
        )
        return avgCap/numOfCoins;
    }

    function averagePriceChange(){
        var avgPrice = 0, numOfCoins = 0;
        coins.map(item => (
            avgPrice += item.price_change_24h,
            numOfCoins++
        )
        )
        return avgPrice/numOfCoins;
    }

    function totalVolume(){
        var avgVolume = 0, numOfCoins = 0;
        coins.map(item => (
            avgVolume += item.total_volume,
            numOfCoins++
        )
        )
        return avgVolume/numOfCoins;
    }
    

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
        <div className='insights'>
                        <div className="sales background--blocks">
                            <div className='insights-icons'>
                                <span className="material-icons-sharp">
                                <FontAwesomeIcon icon="fas fa-chart-line" />
                                </span>
                            </div>
                            <div className="middle">
                                <div className="left">
                                    <h3>Average Market Cap</h3>
                                    {loading ? <h1 className='skeleton-title'></h1> : <h1>${averageMarketCap()}</h1>}
                                </div>
                            </div>
                            <small className='text-muted'>Last 24 Hours</small>
                        </div>
                        <div className="expenses background--blocks">
                            <span className="material-icons-sharp">
                            <FontAwesomeIcon icon="fa-solid fa-circle-dollar-to-slot" />
                            </span>
                            <div className="middle">
                                <div className="left">
                                    <h3>Average Price Change</h3>
                                    {loading ? <h1 className='skeleton-title'></h1> : <h1>${averagePriceChange()}</h1>}
                                </div>
                            </div>
                            <small className='text-muted'>Last 24 Hours</small>
                        </div>
                        <div className="income background--blocks">
                            <span className="material-icons-sharp">
                                <FontAwesomeIcon icon="fas fa-chart-pie" />
                            </span>
                            <div className="middle">
                                <div className="left">
                                    <h3>Total Volume</h3>
                                    {loading ? <h1 className='skeleton-title'></h1> : <h1>${totalVolume()}</h1>}
                                </div>
                                
                            </div>
                            <small className='text-muted'>Last 24 Hours</small>
                        </div>
                    </div> 
        </>
    );
}

export default Insights;
