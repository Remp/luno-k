import React, {Component} from 'react';
import '../styles/FilmDetails.css';
import {connect} from 'react-redux';
import {getCertainMovie} from '../tmdbApi';
import {checkFavorite} from '../serverApi';
import PropTypes from 'prop-types';
import constants from '../redux/constants';
import EmptyPoster from './EmptyPoster';
import Error from './Error';
import Loading from './Loading';
import $ from 'jquery';

class FilmDetails extends Component{
    constructor(){
        super();
        this.onResize = this.onResize.bind(this);
    }
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    componentDidMount(){
        window.addEventListener('resize', this.onResize);
        getCertainMovie(this.context.router.route.match.params.id);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize);
    }
    componentDidUpdate(){
        this.onResize();
    }
    onResize(){
        this.$panel.css({
            maxHeight: window.innerHeight - $('.own-header').innerHeight()
        })
    }
    toggleFavorite(){
        if (!this.props.isFavorite){
            this.props.dispatch({
                type: constants.ADD_TO_FAVORITE,
                film: this.props.film.toJS()
            })
        }
        else{
            this.props.dispatch({
                type: constants.REMOVE_FROM_FAVORITE,
                filmId: this.props.filmId
            })
        }
    }
    render(){
        if (this.props.isFilmLoading)
            return <Loading />
        if (this.props.error){
            return <Error error={this.props.error} />
        }
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
            <div ref={el => this.$panel = $(el)} className="own-film-page">
                <div className="own-film-poster">
                    {
                        this.props.user 
                        &&
                        <button onClick={() => this.toggleFavorite()}>
                            {
                                this.props.isFavorite
                                ?
                                <i className="fas fa-heart"></i>
                                :
                                <i className="far fa-heart"></i>
                            }
                        </button>
                    }  
                    {
                        this.props.poster
                        ?
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${this.props.poster}`} 
                            alt=""
                        />
                        :
                        <EmptyPoster title={this.props.title}/>
                    }                 
                    
                </div>
                <div>
                    <ul className="own-film-details own-blue">
                        <li>
                            <strong>Production companies: </strong>
                            {
                                (this.props.productCompanies
                                ?
                                this.props.productCompanies.map(el => el.get('name')).join(', ')
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
                    {this.props.overview}
                </div>
                {trailer}
            </div>
        )
    }
}
export default connect(state => {
    return {
        poster: state.getIn(['currentFilm', 'poster_path']),
        title: state.getIn(['currentFilm', 'title']),
        overview: state.getIn(['currentFilm', 'overview']),
        rating: state.getIn(['currentFilm' ,'vote_average']),
        releaseDate: state.getIn(['currentFilm', 'release_date']),
        budget: state.getIn(['currentFilm', 'budget']),
        productCompanies: state.getIn(['currentFilm', 'production_companies']),
        runtime: state.getIn(['currentFilm', 'runtime']),
        genres: state.getIn(['currentFilm', 'genres']),
        isFilmLoading: state.get('isFilmLoading'),
        trailer: state.getIn(['currentFilm', 'trailer']),
        isFavorite: state.getIn(['currentFilm', 'isFavorite']),
        filmId: state.getIn(['currentFilm', 'id']),
        user: state.get('user'),
        film: state.get('currentFilm'),
        error: state.get('error')
    }
})(FilmDetails);