import React from 'react';
import FourCoins from './ui/4Coins';
import Insights from './insights';

const Main = () => {

    
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return (
        <>
            <main>
                <div className='row'>
                    <div className='dashboard'>
                        <h1>Dashboard</h1>
                       <span className='date'>{date}/{month}/{year}</span>
                    </div>
                    <Insights/>
                    <FourCoins/>
                    
                </div>
            </main>
        </>
    );
}

export default Main;
