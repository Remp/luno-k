import React, {Component} from 'react';
import '../styles/FilmDetails.css';
import {connect} from 'react-redux';
import {getCertainMovie} from '../tmdbApi';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

class FilmDetails extends Component{
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    componentDidMount(){
        getCertainMovie(this.context.router.route.match.params.id);
    }
    render(){
        if (this.props.isFilmLoading)
            return (
                <div className="own-loading-form">
                    <CircularProgress size={60} thikness={7} />
                </div>
            )
        const trailer = (() => {
            if (this.props.trailer)
                return (
                    <div className="own-film-trailer">
                        <iframe
                            src={`https://www.youtube.com/embed/${this.props.trailer}`}>
                        </iframe>
                    </div>
                    
                )
        })();
        return (
            <div className="own-film-page">
                <div className="own-film-poster">
                    <img src={this.props.poster} alt=""/>
                </div>
                <div>
                    <ul className="own-film-details own-blue">
                        <li>
                            <strong>Production companies: </strong>
                            {
                                (this.props.productCompanies
                                ?
                                this.props.productCompanies.map(el => el.name).join(', ')
                                :null)
                                ||
                                'unknown'
                            }
                        </li>
                        <li>
                            <strong>Rating: </strong>
                            {this.props.rating}
                            <i className="fas fa-star"></i>
                        </li>
                        <li>
                            <strong>Release date: </strong>
                            {this.props.releaseDate}
                        </li>
                        <li>
                            <strong>Budget: </strong>
                            {
                                (this.props.budget
                                ?
                                this.props.budget + '$'
                                :null)
                                ||
                                'unknown'
                            }
                        </li>
                        <li>
                            <strong>Runtime: </strong>
                            {
                                (this.props.runtime
                                ?
                                this.props.runtime + 'min'
                                :null)
                                ||
                                'unknown'
                            }
                        </li>
                        <li>
                            <strong>Genres: </strong>
                            {
                                (this.props.genres
                                ?
                                this.props.genres.map(el => el.get('name')).join(', ')
                                :null)
                                ||
                                'unknown'
                            }
                        </li>
                    </ul>
                </div>
                
                <div className="own-film-desc own-blue">
                    <h2>{this.props.title}</h2>
                    {this.props.description}
                </div>
                {trailer}
            </div>
        )
    }
}
export default connect(state => {
    return {
        poster: `https://image.tmdb.org/t/p/w500${state.getIn(['currentFilm', 'poster_path'])}`,
        title: state.getIn(['currentFilm', 'title']),
        description: state.getIn(['currentFilm', 'overview']),
        rating: state.getIn(['currentFilm' ,'vote_average']),
        releaseDate: state.getIn(['currentFilm', 'release_date']),
        budget: state.getIn(['currentFilm', 'budget']),
        productCompanies: state.getIn(['currentFilm', 'production_companies']),
        runtime: state.getIn(['currentFilm', 'runtime']),
        genres: state.getIn(['currentFilm', 'genres']),
        isFilmLoading: state.get('isFilmLoading'),
        trailer: state.getIn(['currentFilm', 'trailer'])
    }
})(FilmDetails);