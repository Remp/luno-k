import React, {Component} from 'react';
import '../styles/SearchForm.css'

class SearchForm extends Component{
    render(){
        return (
            <div className="own-search-form">
                <input defaultValue='' type="text" placeholder="Search..."/>
                <button><i className="fas fa-search"></i></button>
            </div>
        )
    }
}
export default SearchForm;