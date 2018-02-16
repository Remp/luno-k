import React, {Component} from 'react';
import SearchForm from './SearchForm';
import '../styles/Navigation_own.css';
import $ from 'jquery';
import PropTypes from 'prop-types';
import store from '../redux/store';
import constants from '../redux/constants';
import {connect} from 'react-redux';

/*
    props: {
        user: val
    }
 */
class Navigation extends Component{
    constructor(){
        super();
        this.toggleHandler = this.toggleHandler.bind(this);
    }
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    toggleHandler(){
        if (this.$collapseMenu.css('display') === 'none')
            this.$collapseMenu.css({display: 'flex'})
        else
            this.$collapseMenu.css({display: 'none'})
        this.$btnToggler.toggleClass('rotated');
    }
    componentDidMount(){
        $('.own-main').on('click', this.toggleHandler);
    }
    componentWillUnmount(){
        $('.own-main').off('click', this.toggleHandler);
    }
    redirectTo(path){
        this.context.router.history.push(path);
    }
    signInHandler(){
        store.dispatch({
            type: constants.TOGGLE_AUTH_DIALOG
        })
    }
    signOutHandler(){
        store.dispatch({
            type: constants.SIGN_OUT
        });
        localStorage.removeItem('user');
        if (this.context.router.history.location.pathname === '/fav')
            this.redirectTo('/');
    }
    render(){
        return (
            <div className="own-navbar">
                <div className="own-header">
                    <a onClick={() => this.redirectTo('/')} className="own-brand">
                        <i className="fas fa-moon"></i>
                        <span>Luno-K</span>                        
                    </a>
                    <SearchForm />
                    <div className="own-filter">
                        <i className="fas fa-filter"></i>
                        <span>Filter</span>                        
                    </div>
                    <button 
                        ref={el => this.$btnToggler = $(el)} 
                        onClick={() => this.toggleHandler()} 
                        className='own-toggler'
                    >
                        <i className="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div ref={el => this.$collapseMenu = $(el)} className="own-collapse">
                    <ul>
                        {
                            this.props.user 
                            ?
                            <li onClick={() => this.redirectTo('/fav')}>
                                <i style={{color: '#f70606'}} className="fas fa-heart"></i>
                                Favorites
                            </li>
                            :
                            null
                        }
                        {
                            this.props.user
                            ?
                            <li onClick={() => this.signOutHandler()}>
                                <i className="fas fa-sign-out-alt"></i>
                                Sign out
                            </li>
                            :
                            <li onClick={() => this.signInHandler()}>
                                <i className="fas fa-sign-in-alt"></i>
                                Sign in
                            </li>
                        }
                        {
                            this.props.user
                            ?
                            <li className='red'>
                                <i className="fas fa-address-card"></i>
                                {this.props.user.name}
                            </li>
                            :
                            null
                        }

                    </ul>
                </div>
            </div>
        )
    }
}
export default connect(state => {
    return {
        user: state.get('user') && state.get('user').toJS()
    }
})(Navigation);