import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Gainerloser = ({ maxCoin, minCoin, loading }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className='row'>
                <div className='Gainer-Loser-wrapp'>
                    <FontAwesomeIcon icon="fas fa-arrow-left" onClick={() => navigate('/')} />
                    <div className='Gainer-Loser'>
                        <div className='Gainer'>
                            <div className='Gainer-wrap'>
                                <FontAwesomeIcon icon="fas fa-face-smile" className="gainer-face" />
                                <h2>Gainer</h2>
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
                                        <p>{item.name}</p>
                                        <div className='price-change'>
                                            <p>${item.current_price}</p>
                                            <p className='Green'>+{item.price_change_percentage_24h}%</p>
                                        </div>
                                    </div>)}
                            </div>
                            <small className='text-muted'>Last 24 Hours</small>
                        </div>
                        <div className='Loser'>
                            <div className='Loser-wrap'>
                                <FontAwesomeIcon icon="fas fa-face-frown" className="loser-face" />
                                <h2>Loser</h2>
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
                                    <p>{item.name}</p>
                                    <div className='price-change'>
                                        <p>${item.current_price}</p>
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
