import React, {Component} from 'react';
import SearchForm from './SearchForm';
import '../styles/Navigation_own.css';
import $ from 'jquery';

/*
    props: {
        user: val
    }
 */
export default class Navigation extends Component{
    constructor(){
        super();
        this.onResizeHandler = () => {
            if (window.innerWidth >= 576)
                this.$collapseMenu.css({display: 'flex'})
        }
        this.toggleHandler = this.toggleHandler.bind(this);
    }
    toggleHandler(){
        if (this.$collapseMenu.css('display') === 'none')
            this.$collapseMenu.css({display: 'flex'})
        else
            this.$collapseMenu.css({display: 'none'})
        this.$btnToggler.toggleClass('rotated');
    }
    componentDidMount(){
        window.addEventListener('resize', this.onResizeHandler, false);
        $('.own-main').on('click', this.toggleHandler);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResizeHandler, false);
        $('.own-main').off('click', this.toggleHandler);
    }
    render(){
        return (
            <div className="own-navbar">
                <div className="own-header">
                    <a href='/' className="own-brand">
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
                            <li>
                                <i style={{color: '#f70606'}} className="fas fa-heart"></i>
                                Favorites
                            </li>
                            :
                            null
                        }
                        {
                            this.props.user
                            ?
                            <li>
                                <i className="fas fa-sign-out-alt"></i>
                                Sign out
                            </li>
                            :
                            <li>
                                <i className="fas fa-sign-in-alt"></i>
                                Sign in
                            </li>
                        }
                        {
                            this.props.user
                            ?
                            <li>
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