import {fromJS} from 'immutable';
import constants from './constants';
const def = fromJS({
    user: null,
    films: fromJS([]),
    currentFilm: fromJS({}),
    searchString: '',
    isFilmLoading: false
})
export default (state = def, action) => {
    switch (action.type){
        case constants.START_FILMS_REQUEST:
            return switchLoading(resetCurrentFilm(state));
        case constants.FINISH_FILMS_REQUEST:
            return finishFilmsLoading(switchLoading(state), action.films)
        case constants.CHANGE_SEARCH_STRING:
            return state.set('searchString', action.searchString)
        case constants.FINISH_CERTAIN_FILM_REQUEST: 
            return finishCertainFilmLoading(switchLoading(state), action.film)
        default: 
            return state
    }
}
function switchLoading(state){
    return state.update('isFilmLoading', l => !l)
}
function resetCurrentFilm(state){
    return state.set('currentFilm', {})
}
function finishFilmsLoading(state, films){
    return state.set('films', films);
}
function finishCertainFilmLoading(state, film){
    return state.set('currentFilm', film)
}