import React, {Component} from 'react';
import FilmCard from './FilmCard';
import '../styles/FilmsListMasonry.css';
import {Grid, Row, Col} from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {getMostRatedFilms} from '../tmdbApi';
import Error from './Error';
import $ from 'jquery';
import Loading from './Loading';
import purerendermixin from 'pure-render-mixin';

class FilmsList extends Component{
    constructor(){
        super();
        this.mixins = [purerendermixin];
        this.onResize = this.onResize.bind(this);
    }
    onFilmClickHandler(id){
        this.props.history.push(`/film=${id}`);
    }
    renderCard(id, poster, vote, title){
        return (
            <div 
                className="own-item"  
                onClick={() => this.onFilmClickHandler(id)}  
                key={id}                                   
            >
                <FilmCard 
                    posterImg={poster} 
                    rating={vote} 
                    title={title}
                />
            </div>
        )
    }
    componentDidMount(){
        this.onResize();
        window.addEventListener('resize', this.onResize);
        this.$panel.scrollTop(window.filmListScroll || 0)
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize);
    }
    onResize(){
        this.$panel.css({
            maxHeight: window.innerHeight - $('.own-header').height()
        })
    }
    componentWillUnmount(){
        window.filmListScroll = this.$panel.scrollTop();
        
    }
    onMoreClickHandler(){
        getMostRatedFilms(this.props.currentPage + 1);
    }
    render(){
        if (this.props.error){
            return <Error error={this.props.error} />
        }
        const masonryOptions = {
            columnWidth: '.own-item-sizer',
            itemSelector: '.own-item',
            percentPosition: true,
        }
        const searchString = this.props.searchString.trim();
        const reg = RegExp(`${searchString}`, 'i');
        return (
            <div ref={el => this.$panel = $(el)} className='own-film-panel'>
                <Masonry
                    className='own-film-list'
                    option={masonryOptions}
                >
                    {
                        this.props.films && this.props.films.map(el => {
                            if (searchString){
                                if (el.title.search(reg) != -1){
                                    return (
                                        this.renderCard(el.id, el.poster_path, el.vote_average, el.title)
                                    )
                                }
                            }
                            else
                                return (
                                    this.renderCard(el.id, el.poster_path, el.vote_average, el.title)
                                )

                        })
                    }
                </Masonry>
                {
                    this.props.isFilmLoading
                    ?
                    <Loading />
                    :
                    this.props.currentPage < this.props.totalPages
                    &&
                    <div className="own-more" onClick={() => this.onMoreClickHandler()}>
                        <i className="fas fa-chevron-circle-down"></i>
                    </div>
                }
                
            </div>
            
        )
    }
}
export const MainFilmsList = connect(state => {
    return {
        isFilmLoading: state.get('isFilmLoading'),
        films: state.get('films'),
        searchString: state.get('searchString'),
        currentPage: state.get('currentPage'),
        totalPages: state.get('totalPages'),
        error: state.get('error')
    }
})(FilmsList);
export const FavFilmsList = connect(state => {
    return {
        isFilmLoading: state.get('isFilmLoading'),
        films: state.getIn(['user', 'favorites']),
        searchString: state.get('searchString'),
        error: state.get('error')
    }
})(FilmsList);
