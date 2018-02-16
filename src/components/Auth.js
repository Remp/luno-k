import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import {facebookAppID} from '../config';
import {googleAppID} from '../config';
import store from '../redux/store';
import constants from '../redux/constants';
import {GoogleLogin} from 'react-google-login';
import '../styles/Auth.css'

class Auth extends Component{
    handleClose(){
        this.props.dispatch({
            type: constants.TOGGLE_AUTH_DIALOG
        })
    }
    responseAuth(res, type){
        this.handleClose();
        const user = {};
        switch(type){
            case 'facebook':
                user.id = res.id;
                user.name = res.name;
                break;
            case 'google':
                user.id = res.googleId
                user.name = res.w3.ig
        }
        if (user.id){
            store.dispatch({
                type: constants.AUTHORIZATION,
                user: user
            });
            localStorage.setItem('user', JSON.stringify(user));
            const currentFilm = store.getState().get('currentFilm');
            if (currentFilm)
                store.dispatch({
                    type: constants.FAV_CHECKING,
                    filmId: currentFilm.get('id')
                })
        }
        
    }
    render(){
        const icon = <i className="fab fa-facebook" />     
        return ( 
            <Dialog
                modal={false}
                open={this.props.isOpen}
                onRequestClose={() => this.handleClose()}
                contentClassName='own-auth'
            >
                <FacebookLogin
                    appId={facebookAppID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={(res) =>  this.responseAuth(res, 'facebook')}
                    size='small'
                    textButton='Facebook'
                    cssClass='own-auth-btn blue'
                />
                <GoogleLogin
                    clientId={googleAppID}
                    buttonText="Google"
                    onSuccess={(res) => this.responseAuth(res, 'google')}
                    onFailure={(res) => this.responseAuth(res, 'google')}
                    className='own-auth-btn red'
                />
            </Dialog>
        )
    }
}
export default connect(state => {
    return {isOpen: state.get('isAuthOpen')}
})(Auth);