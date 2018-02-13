import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import {facebookAppID} from '../config';
import store from '../redux/store';
import constants from '../redux/constants';

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
                user.id = res.id
                user.name = res.name
        }
        if (user.id){
            store.dispatch({
                type: constants.AUTHORIZATION,
                user: user
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
            >
                <FacebookLogin
                    appId={facebookAppID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={(res) =>  this.responseAuth(res, 'facebook')}
                    size='small'
                    icon={icon}
                    textButton=' Facebook'
                />
            </Dialog>
        )
    }
}
export default connect(state => {
    return {isOpen: state.get('isAuthOpen')}
})(Auth);