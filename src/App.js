import React from "react";
import Dashboard from "./Pages/Dashboard";
import Coins from "./Pages/Coins";
import Coin from "./Pages/Coin";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Favoritecoins from "./Pages/FavoriteCoins";



function App() {

  const [favCoin, setFavcoin] = useState([]);
  function addFavoriteCoin(coin){
    setFavcoin([...favCoin, {
      ...coin
  }])
  }

  function removeItem(coin){
    setFavcoin(favCoin.filter(item => item.id !== coin))
  }

  
  return(
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/coins" element={<Coins/>}></Route>
      <Route path="/coins/:id" element={<Coin addFavCoin = {addFavoriteCoin} favCoin = {favCoin}/>}></Route>
      <Route path="/favoritecoins" element = {<Favoritecoins favCoins = {favCoin} removeCoin = {removeItem}/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
