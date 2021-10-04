import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import TestCard from './components/TestCard';
import Restraw from './myRestraw/Restorent';
import Menu from './components/Manu';
import Header from './myRestraw/Header';
import AddFood from './myRestraw/AddFood';

import { BrowserRouter, Switch, Router, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Header/>
      <Switch>
        <Route exact path="/"  component={Restraw} />
        <Route path="/add" component={AddFood} />
      </Switch>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
