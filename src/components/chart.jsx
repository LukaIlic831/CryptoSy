import react from "react";
import {Line} from 'react-chartjs-2';
import Chart from "chart.js/auto";
import {CategoryScale} from 'chart.js';
import axios from 'axios';
import { useState, useEffect } from 'react';



const ChartLine = ({coinname}) => {

  const [price, setPrice] = useState([]);


    async function fetchData() {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinname}/market_chart?vs_currency=usd&days=1&interval=hourly`)
        setPrice(data.prices.map(item => item[1]));
    }

      
       

    useEffect(() => {
        fetchData();
    }, []);


  const data = {
    labels:["00:00AM", "06:00AM", "11:00AM", "05:00PM", "10:00PM"],
    datasets:[
      {
        label:`${coinname} Price`,
        data:[price[0], price[6], price[11], price[17], price[22]],
        backgroundColor: ["rgb(65, 65, 207)"],
        hoverOffset: 4,
        borderColor: 'rgb(65, 65, 207)',
      },
    ],
  };
  
    return (
        <div>
      <Line data={data} />
    </div>
    );
}

export default ChartLine;
