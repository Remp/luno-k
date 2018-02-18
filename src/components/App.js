import React, {Component} from 'react';
import Navigation from './Navigation';
import '../styles/App.css';
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

export default class App extends Component{
    componentDidMount(){
        this.$main.css({
            paddingTop: $('.own-header').height()
        });
        const user = localStorage.getItem('user')
        // auth if user data saved
        if (user){
            store.dispatch({
                type: constants.AUTHORIZATION,
                user: JSON.parse(user)
            })
        }       
        getMostRatedFilms();
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize)
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
                            return <MainFilmsList {...props} />
                        }}/>
                    </Switch>
                </main>
                <Auth />
                
            </div>
        )
    }
}