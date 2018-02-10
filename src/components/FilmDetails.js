import React, {Component} from 'react';
import '../styles/FilmDetails.css';
import {connect} from 'react-redux';
import tmdbApi from '../tmdbApi';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

class FilmDetails extends Component{
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    componentDidMount(){
        tmdbApi.getCertainMovie(this.context.router.route.match.params.id);
    }
    render(){
        if (this.props.isFilmLoading)
            return (
                <div className="own-loading-form">
                    <CircularProgress size={60} thikness={7} />
                </div>
            )
        return (
            <div className="own-film-page">
                <div className="own-film-poster">
                    <img src={this.props.poster} alt=""/>
                </div>
                <ul className="own-film-details">
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
                                this.props.genres.map(el => el.name).join(', ')
                                :null)
                                ||
                                'unknown'
                            }
                        </li>
                    </ul>
                <div className="own-film-desc">
                    <h2>{this.props.title}</h2>
                    {this.props.description}
                </div>
            </div>
        )
    }
}
export default connect(state => {
    const currentFilm = state.get('currentFilm')
    return {
        poster: `https://image.tmdb.org/t/p/w500${currentFilm.poster_path}`,
        title: currentFilm.title,
        description: currentFilm.overview,
        rating: currentFilm.vote_average,
        releaseDate: currentFilm.release_date,
        budget: currentFilm.budget,
        productCompanies: currentFilm.production_companies,
        runtime: currentFilm.runtime,
        genres: currentFilm.genres,
        isFilmLoading: state.isFilmLoading
    }
})(FilmDetails);