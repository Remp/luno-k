import React, {Component} from 'react';
import Navigation from './Navigation';
import '../styles/App.css';
import {BrowserRouter} from 'react-router';
import {MainFilmsList} from './FilmsListMasonry';
import {FavFilmsList} from './FilmsListMasonry';
import $ from 'jquery';
import {Route, Switch, Redirect} from 'react-router-dom';
import {getMostRatedFilms} from '../tmdbApi';
import {getFavorites} from '../serverApi';
import FilmDetails from './FilmDetails';
import Auth from './Auth';
import store from '../redux/store';

export default class App extends Component{
    componentDidMount(){
        this.$main.css({
            paddingTop: $('.own-navbar').height()
        });
    }
    render(){
        return (
            <div className="app">
                <Navigation />
                <main ref={el => this.$main = $(el)}>
                    <Switch>
                        <Route path='/fav' component={props => {
                            if (!store.getState().get('user'))
                                return <Redirect to='/' />
                            getFavorites();
                            return <FavFilmsList {...props} />
                        }} />
                        <Route path='/film=:id' component={FilmDetails} />
                        <Route path='/' component={props => {
                            getMostRatedFilms();
                            return <MainFilmsList {...props} />
                        }}/>
                    </Switch>
                </main>
                <Auth />
            </div>
        )
    }
}