import $ from 'jquery';
import store from './redux/store';
import constants from './redux/constants';
import {checkFavorite} from './serverApi';

const KEY = '1401f3d1730118cc165a525de85c0f6d';
const baseUrl = 'https://api.themoviedb.org';

export function getMostRatedFilms(page = 1){
    $.ajax({
        url: `${baseUrl}/3/discover/movie/?api_key=${KEY}&certification_country=US&page=${page}&vote_count.gte=1000&certification=R&sort_by=vote_average.desc`,
        method: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        accepts: 'application/json',
        success: dispatchFilms,
        beforeSend: beforeSend,
        error: onErrorHandler,
    })
}
export function getCertainMovie(id){
    $.ajax({
        url: `${baseUrl}/3/movie/${id}?api_key=${KEY}`,
        method: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        accepts: 'application/json',
        success: dispatchCertainFilm,
        beforeSend: beforeSend,
        error: onErrorHandler,
    })
}
export function getTrailer(id){
    $.ajax({
        url: `${baseUrl}/3/movie/${id}/videos?api_key=${KEY}`,
        method: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        accepts: 'application/json',
        success: dispatchVideo,
        beforeSend: beforeSendVideo,
    })
}
function onErrorHandler(err){
    store.dispatch({
        type: constants.ERROR,
        error: {
            status: err.status,
            statusText: err.statusText
        }
    })
}
function dispatchFilms(data){
    store.dispatch({
        type: constants.FINISH_FILMS_REQUEST,
        films: data.results,
        totalPages: data.total_pages,
        currentPage: data.page
    });
}
function dispatchCertainFilm(data){
    store.dispatch({
        type: constants.FINISH_CERTAIN_FILM_REQUEST,
        film: data
    });
    if (data.video) 
        getTrailer(data.id);
    if(store.getState().get('user')) 
        store.dispatch({
            type: constants.FAV_CHECKING,
            filmId: data.id
        })

}
function beforeSend(){
    store.dispatch({
        type: constants.START_FILMS_REQUEST
    })
}
function beforeSendVideo(){
    store.dispatch({
        type: constants.START_VIDEO_REQUEST
    })
}
function dispatchVideo(data){
    const trailer = (() => {
        for (let i = 0; i < data.results.length; i++){
            const current = data.results[i];
            if (current.type === 'Trailer' && current.site === 'YouTube')
                return current.id        
        }
        return data.results.lenght && data.results[0];
    })();
    store.dispatch({
        type: constants.FINISH_VIDEO_REQUEST,
        trailer: trailer
    })
}