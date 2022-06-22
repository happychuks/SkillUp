//import logo from './logo.svg';
import React from 'react'
//import React, { useEffect, useState} from 'react';
//import ConsumerCheck from './HOC/consumerCheck'
//import UploaderCheck from './HOC/uploaderCheck'
import Navtopbar from './components/Navtopbar'
import Homepage from './pages/Homepage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import './App.css';
//import './styles/loading.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function App() {
  return (
    <div className="App">
      <header>
        SkillUp App 
        Credo group
        20/06/2022
      </header>
    </div>
  );
}

export default App;
