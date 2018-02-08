import React, {Component} from 'react';
import FilmCard from './FilmCard';
import '../styles/FilmsListMasonry.css';
import {Grid, Row, Col} from 'react-bootstrap';
import Masonry from 'react-masonry-component';

import poster from '../images/sinister.jpg';
import duel from '../images/duel.jpg';

class FilmsList extends Component{
    render(){
        const masonryOptions = {
            columnWidth: '.own-item-sizer',
            itemSelector: '.own-item',
            percentPosition: true,
            fitWidth: true
        }
        return (
            <Masonry
                className='own-film-list'
                option={masonryOptions}
            >
                <div className="own-item">
                    <FilmCard posterImg={poster} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={duel} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={poster} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={poster} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={duel} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={poster} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={poster} rating={4} title='sinister' />
                </div>
                <div className="own-item">
                    <FilmCard posterImg={duel} rating={4} title='sinister' />
                </div>

            </Masonry>
        )
    }
}
export default FilmsList;