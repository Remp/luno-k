import {fromJS} from 'immutable';
import constants from './constants';
const def = fromJS({
    user: null,
    films: fromJS([]),
    searchString: '',
    isFilmLoading: false
})
export default (state = def, action) => {
    switch (action.type){
        case constants.START_FILMS_REQUEST:
            return switchLoading(state);
        case constants.FINISH_FILMS_REQUEST:
            return finishLoading(switchLoading(state), action.films)
        case constants.CHANGE_SEARCH_STRING:
            return state.set('searchString', action.searchString)
        default: 
            return state
    }
}
function switchLoading(state){
    return state.update('isFilmLoading', l => !l)
}
function finishLoading(state, films){
    return state.set('films', films);
}