import React, {Component} from 'react';
import Navigation from './Navigation';
import '../styles/App.css';
import {BrowserRouter} from 'react-router';
import FilmsList from './FilmsListMasonry';
import $ from 'jquery';
import {Route, Switch} from 'react-router-dom';
import tbmdApi from '../tmdbApi';

export default class App extends Component{
    componentDidMount(){
        this.$main.css({
            paddingTop: $('.own-navbar').height()
        });
        tbmdApi.getMostRatedFilms();
    }
    render(){
        return (
            <div className="app">
                <Navigation />
                <main ref={el => this.$main = $(el)}>
                    <Switch>
                        <Route path='/fav' component={() => <div> Hello</div>} />
                        <Route path='/film=:id' component={() => <div> Hello</div>} />
                        <Route path='/' component={FilmsList}/>
                    </Switch>
                </main>
            </div>
        )
    }
}