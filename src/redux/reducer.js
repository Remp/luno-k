import {fromJS} from 'immutable';
import constants from './constants';
const def = fromJS({
    user: null,
    films: fromJS([]),
    currentFilm: fromJS({}),
    searchString: '',
    isFilmLoading: false,
    isVideoLoading: false,
    isAuthOpen: false,
    error: null
})
export default (state = def, action) => {
    switch (action.type){
        case constants.START_FILMS_REQUEST:
            return switchLoading(resetCurrentFilm(state));
        case constants.FINISH_FILMS_REQUEST:
            return resetError(finishFilmsLoading(switchLoading(setPages(state, action.totalPages, action.currentPage)), action.films))
        case constants.CHANGE_SEARCH_STRING:
            return state.set('searchString', action.searchString)
        case constants.FINISH_CERTAIN_FILM_REQUEST: 
            return resetError(finishCertainFilmLoading(switchLoading(state), action.film))
        case constants.START_VIDEO_REQUEST:
            return switchVideoLoading(state)
        case constants.FINISH_VIDEO_REQUEST:
            return resetError(finishVideoLoading(switchVideoLoading(state), action.trailer))
        case constants.TOGGLE_AUTH_DIALOG:
            return state.update('isAuthOpen', l => !l);
        case constants.AUTHORIZATION:
            return resetError(state.set('user', fromJS(action.user)))
        case constants.SIGN_OUT:
            return state.delete('user');
        case constants.FINISH_FAVORITES_REQUEST:
            return resetError(finishFavoritesLoading(switchLoading(state), action.favorites))
        case constants.ADD_TO_FAVORITE:
            return toggleFavorite(state, action.film);
        case constants.REMOVE_FROM_FAVORITE:
            return toggleFavorite(state, action.film);
        case constants.FINISH_FAV_CHEKING:
            return resetError(state.setIn(['currentFilm', 'isFavorite'], action.isFavorite))
        case constants.ERROR: 
            return state.set('error', action.error)
        default: 
            return resetError(state)
    }
}
function resetError(state){
    return state.delete('error');
}
function setPages(state, totalPages, currentPage){
    return state.set('totalPages', totalPages).set('currentPage', currentPage);
}
function toggleFavorite(state, film){
    return state.updateIn(['currentFilm', 'isFavorite'], false, l => !l);
}
function finishFavoritesLoading(state, favorites){
    return state.setIn(['user', 'favorites'], favorites)
}
function switchLoading(state){
    return state.update('isFilmLoading', l => !l)
}
function resetCurrentFilm(state){
    return state.set('currentFilm', fromJS({}))
}
function finishFilmsLoading(state, films){
    return state.update('films', cfilms => cfilms.push(...films));
}
function finishCertainFilmLoading(state, film){
    return state.set('currentFilm', fromJS(film))
}
function finishVideoLoading(state, trailer){
    return state.setIn(['currentFilm', 'trailer'], trailer)
}
function switchVideoLoading(state){
    return state.update('isVideoLoading', l => !l);
}