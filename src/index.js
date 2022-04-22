import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faBars, faXmark, faChartPie, faAngleRight, faArrowLeft, faBackward, faChartLine, faCircleHalfStroke, faCircleDollarToSlot, faStar, faFaceSmile, faFaceFrown} from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faXmark, faAngleRight, faChartPie, faArrowLeft, faBackward, faChartLine, faCircleHalfStroke,faCircleDollarToSlot, faStar ,faFaceSmile, faFaceFrown);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
