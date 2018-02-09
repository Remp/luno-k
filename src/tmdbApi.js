import $ from 'jquery';
import store from './redux/store';
import constants from './redux/constants';

const KEY = '1401f3d1730118cc165a525de85c0f6d';
const baseUrl = 'https://api.themoviedb.org';

export default {
    getMostRatedFilms(){
        $.ajax({
            url: `${baseUrl}/3/discover/movie/?api_key=${KEY}&certification_country=US&certification=R&sort_by=vote_average.desc`,
            method: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            accepts: 'application/json',
            success: dispatchFilms,
            beforeSend: beforeSend,
            error: onErrorHandler,
        })
    },
}
function onErrorHandler(x, str, a){
    const xx = x;
}
function dispatchFilms(data){
    store.dispatch({
        type: constants.FINISH_FILMS_REQUEST,
        films: data.results
    });
}
function beforeSend(xhr){
    store.dispatch({
        type: constants.START_FILMS_REQUEST
    })
}