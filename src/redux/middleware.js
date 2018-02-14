import constants from './constants';
import {auth, signOut} from '../serverApi';

export const middleware = () => next => action => {
    switch (action.type){
        case constants.AUTHORIZATION: 
            auth(action.user.id)
        case constants.SIGN_OUT:
            signOut();
    }       
    next(action);
}