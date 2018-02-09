import React, {Component} from 'react';
import '../styles/FilmCard.css';

export default class FilmCard extends Component{
    _ratingToStars(){
        const stars = [];
        const rating = Math.round(this.props.rating / 2);
        for (let i = 0; i < 5; i++)
            stars.push(i < rating ? <i className='fas fa-star gold'/> : <i className='far fa-star gold'/>)
        return stars;
    }
    render(){  
        const rating = Math.round(this.props.rating * 10) / 10
        return (
            <div className="own-film-card">
                <div className="own-poster">
                    <div className="own-rating"></div>
                    <img src={this.props.posterImg} alt=""/>
                </div>
                <div className="own-desc">
                    <div>
                        {this._ratingToStars()}
                    </div>
                    {rating}
                </div>
            </div>
        )
    }
}