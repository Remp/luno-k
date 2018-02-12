import React, {Component} from 'react';
import Navigation from './Navigation';
import '../styles/App.css';
import {BrowserRouter} from 'react-router';
import FilmsList from './FilmsListMasonry';
import $ from 'jquery';
import {Route, Switch} from 'react-router-dom';
import {getMostRatedFilms} from '../tmdbApi';
import FilmDetails from './FilmDetails';

export default class App extends Component{
    componentDidMount(){
        this.$main.css({
            paddingTop: $('.own-navbar').height()
        });
        getMostRatedFilms();
    }
    render(){
        return (
            <div className="app">
                <Navigation />
                <main ref={el => this.$main = $(el)}>
                    <Switch>
                        <Route path='/fav' component={() => <div> Hello</div>} />
                        <Route path='/film=:id' component={FilmDetails} />
                        <Route path='/' component={FilmsList}/>
                    </Switch>
                </main>
            </div>
        )
    }
}