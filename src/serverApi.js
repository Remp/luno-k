import $ from 'jquery';
import constants from './redux/constants';
import store from './redux/store';

export function auth(id){
    $.ajax({
        url: '/auth',
        method: 'POST',
        data: id,
        contentType: 'text/plain'
    })
}
export function signOut(){
    $.ajax({
        url: '/sign_out',
        method: 'POST',
    })
}
export function getFavorites(){
    const state = store.getState();
    const data = state.getIn(['user', 'id']);
    $.ajax({
        url: '/fav',
        method: 'GET',
        accepts: 'application/json',
        success: dispatchFavorites,
        beforeSend: beforeSend,
        error: onErrorHandler,
        data: data,
        contentType: 'text/plain'
    })
}
function onErrorHandler(){
    const x = 123;
}
function dispatchFavorites(data){
    const parsed = JSON.parse(data);
    store.dispatch({
        type: constants.FINISH_FAVORITES_REQUEST,
        favorites: parsed
    });
}
function beforeSend(){
    store.dispatch({
        type: constants.START_FILMS_REQUEST
    })
}