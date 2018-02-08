import React, {Component} from 'react';
import Navigation from './Navigation';
import '../styles/App.css';
import {BrowserRouter} from 'react-router';
import FilmsList from './FilmsListMasonry';
import $ from 'jquery';

export default class App extends Component{
    componentDidMount(){
        this.$main.css({
            paddingTop: $('.own-navbar').height()
        })
    }
    render(){
        return (
            <div className="app">
                <Navigation />
                <main ref={el => this.$main = $(el)}>
                    <FilmsList />
                </main>
            </div>
        )
    }
}