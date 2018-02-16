import React, {Component} from 'react';
import FilmCard from './FilmCard';
import '../styles/FilmsListMasonry.css';
import {Grid, Row, Col} from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {getMostRatedFilms} from '../tmdbApi';

class FilmsList extends Component{
    onFilmClickHandler(id){
        this.props.history.push(`/film=${id}`);
    }
    renderCard(id, poster, vote, title){
        return (
            <div 
                className="own-item"  
                onClick={() => this.onFilmClickHandler(id)}                                     
            >
                <FilmCard 
                    posterImg={poster} 
                    rating={vote} 
                    title={title}
                />
            </div>
        )
    }
    onMoreClickHandler(){
        getMostRatedFilms(this.props.currentPage + 1);
    }
    render(){
        const masonryOptions = {
            columnWidth: '.own-item-sizer',
            itemSelector: '.own-item',
            percentPosition: true,
        }
        // if (this.props.isFilmLoading)
        //     return (
        //         <div className="own-loading-form">
        //             <CircularProgress size={60} thikness={7} />
        //         </div>
        //     )
        const searchString = this.props.searchString.trim();
        const reg = RegExp(`${searchString}`, 'i');
        return (
            <div>
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
                    <div className="own-loading-form">
                        <CircularProgress size={60} thikness={7} />
                    </div>
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
        totalPages: state.get('totalPages')
    }
})(FilmsList);
export const FavFilmsList = connect(state => {
    return {
        isFilmLoading: state.get('isFilmLoading'),
        films: state.getIn(['user', 'favorites']),
        searchString: state.get('searchString')
    }
})(FilmsList);
