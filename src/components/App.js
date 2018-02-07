import React, {Component} from 'react';
import Navigation from './Navigation';
import '../styles/App.css';
import {BrowserRouter} from 'react-router';

export default class App extends Component{
    render(){
        return (
            <div className="app">
                <Navigation />
            </div>
        )
    }
}