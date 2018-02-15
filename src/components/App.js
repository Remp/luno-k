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
import constants from '../redux/constants';
import {fromJS} from 'immutable';

export default class App extends Component{
    componentDidMount(){
        this.$main.css({
            paddingTop: $('.own-navbar').height()
        });
        const user = localStorage.getItem('user')
        if (user){
            store.dispatch({
                type: constants.AUTHORIZATION,
                user: JSON.parse(user)
            })
        }

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