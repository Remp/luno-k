import constants from './constants';
import {auth, signOut, addToFavorite, removeFromFavorite} from '../serverApi';
import {checkFavorite} from '../serverApi';

export const middleware = () => next => action => {
    switch (action.type){
        case constants.AUTHORIZATION: 
            auth(action.user.id)
            break;
        case constants.SIGN_OUT:
            signOut();
            break;
        case constants.ADD_TO_FAVORITE:
            addToFavorite(action.film);
            break;
        case constants.REMOVE_FROM_FAVORITE:
            removeFromFavorite(action.filmId)
            break;
        case constants.FAV_CHECKING:
            checkFavorite(action.filmId)
            break;
    }       
    next(action);
}