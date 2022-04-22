import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Gainerloser = ({ maxCoin, minCoin, loading }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className='row'>
                <div className='Gainer-Loser-wrapp'>
                    <div className='Gainer-Loser'>
                        <div className='Gainer'>
                            <div className='Gainer-wrap'>
                                <FontAwesomeIcon icon="fas fa-face-smile" className="gainer-face" />
                               
                                {
                                    loading ? 
                                    maxCoin.map(item => <div key={item.id}>
                                         <p className='skeleton-para'></p>
                                        <div>
                                            <p className='skeleton-para'></p>
                                            <p className='skeleton-para'></p>
                                        </div>
                                    </div>)
                                    :
                                    maxCoin.map(item => <div key={item.id}>
                                        <p className='c-name'>{item.name}</p>
                                        <div className='price-change'>
                                            <p className='price-change-pr'>${item.current_price}</p>
                                            <p className='Green'>+{item.price_change_percentage_24h}%</p>
                                        </div>
                                    </div>)}
                            </div>
                            <small className='text-muted'>Last 24 Hours</small>
                        </div>
                        <div className='Loser'>
                            <div className='Loser-wrap'>
                                <FontAwesomeIcon icon="fas fa-face-frown" className="loser-face" />
                                
                                {
                                    loading ?
                                    minCoin.map(item => <div key={item.id}>
                                        <p className='skeleton-para'></p>
                                        <div>
                                            <p className='skeleton-para'></p>
                                            <p className='skeleton-para'></p>
                                        </div>
                                    </div>)
                                    :
                                    minCoin.map(item => <div key={item.id}>
                                    <p  className='c-name'>{item.name}</p>
                                    <div className='price-change'>
                                        <p className='price-change-pr'>${item.current_price}</p>
                                        <p className='Red'>{item.price_change_percentage_24h}%</p>
                                    </div>
                                </div>)}
                            </div>
                            <small className='text-muted'>Last 24 Hours</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Gainerloser;
