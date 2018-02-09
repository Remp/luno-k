import React, {Component} from 'react';
import FilmCard from './FilmCard';
import '../styles/FilmsListMasonry.css';
import {Grid, Row, Col} from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';

class FilmsList extends Component{
    render(){
        const masonryOptions = {
            columnWidth: '.own-item-sizer',
            itemSelector: '.own-item',
            percentPosition: true,
        }
        if (this.props.isFilmLoading)
            return (
                <div className="own-loading-form">
                    <CircularProgress size={60} thikness={7} />
                </div>
            )
        const searchString = this.props.searchString.trim();
        const reg = RegExp(`${searchString}`, 'i');
        return (
            <Masonry
                className='own-film-list'
                option={masonryOptions}
            >
                {
                    this.props.films.map(el => {
                        const r = el.title.search(reg);
                        if (searchString){
                            if ((el.title.search(reg) != -1))
                                {return (
                                    <div className="own-item">
                                        <FilmCard 
                                            posterImg={`https://image.tmdb.org/t/p/w500${el.poster_path}`} 
                                            rating={el.vote_average} 
                                        />
                                    </div>
                                )
                            }
                        }
                        else
                            return (
                                <div className="own-item">
                                    <FilmCard 
                                        posterImg={`https://image.tmdb.org/t/p/w500${el.poster_path}`} 
                                        rating={el.vote_average} 
                                    />
                                </div>
                            )

                    })
                }
            </Masonry>
        )
    }
}
export default connect(state => {
    return {
        isFilmLoading: state.get('isFilmLoading'),
        films: state.get('films'),
        searchString: state.get('searchString')
    }
})(FilmsList);