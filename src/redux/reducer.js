import {fromJS} from 'immutable';
import constants from './constants';
const def = fromJS({
    user: null,
    films: fromJS([]),
    currentFilm: fromJS({}),
    searchString: '',
    isFilmLoading: false,
    isVideoLoading: false,
    isAuthOpen: false
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
        case constants.START_VIDEO_REQUEST:
            return switchVideoLoading(state)
        case constants.FINISH_VIDEO_REQUEST:
            return finishVideoLoading(switchVideoLoading(state), action.trailer)
        case constants.TOGGLE_AUTH_DIALOG:
            return state.update('isAuthOpen', l => !l);
        case constants.AUTHORIZATION:
            return state.set('user', action.user);
        case constants.SIGN_OUT:
            return state.delete('user');
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
    return state.set('currentFilm', fromJS(film))
}
function finishVideoLoading(state, trailer){
    return state.setIn(['currentFilm', 'trailer'], trailer)
}
function switchVideoLoading(state){
    return state.update('isVideoLoading', l => !l);
}