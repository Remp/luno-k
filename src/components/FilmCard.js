import React, {Component} from 'react';
import '../styles/FilmCard.css';
import EmptyPoster from './EmptyPoster';

export default class FilmCard extends Component{
    ratingToStars(){
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
                    {
                        this.props.posterImg
                        ?
                        <img src={`https://image.tmdb.org/t/p/w500${this.props.posterImg}`} alt=""/>
                        :
                        <EmptyPoster title={this.props.title}/>
                    }
                </div>
                <div className="own-desc">
                    <div>
                        {this.ratingToStars()}
                    </div>
                    {rating}
                </div>
            </div>
        )
    }
}