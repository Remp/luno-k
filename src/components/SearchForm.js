import React, {Component} from 'react';
import '../styles/SearchForm.css';
import {connect} from 'react-redux';
import store from '../redux/store';
import constants from '../redux/constants';
import purerendermixin from 'pure-render-mixin';

class SearchForm extends Component{
    constructor(){
        super();
        this.mixins = [purerendermixin];
    }
    onChangeHandler(e){
        store.dispatch({
            type: constants.CHANGE_SEARCH_STRING,
            searchString: e.target.value
        })
    }
    render(){
        return (
            <div className="own-search-form">
                <input 
                    onChange={e => this.onChangeHandler(e)} 
                    value={this.props.searchString} 
                    type="text" 
                    placeholder="Search..."
                />
                <button><i className="fas fa-search"></i></button>
            </div>
        )
    }
}
export default connect(state => {
    return {
        searchString: state.get('searchString') || ''
    }
})(SearchForm);