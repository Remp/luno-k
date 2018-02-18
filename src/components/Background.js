import React, {Component} from 'react';
import $ from 'jquery';
import '../styles/Background.css';

export default class Background extends Component{
    constructor(){
        super();
        this.renderBackground = this.renderBackground.bind(this);
        this.elems = ['fas fa-star', 'fas fa-moon', 'far fa-moon', 'fas fa-coffee', 
            'fas fa-binoculars', 'fab fa-affiliatetheme', 'fab fa-android', 'fab fa-apple',
            'fas fa-globe', 'fab fa-windows', 'fab fa-linux'
        ];
        this.animates = ['anim1', 'anim2', 'anim3', 'anim4', 'no-anim', 'anim5', 'anim6', 'anim7', 'anim8'];
        this.colors = ['#a429af', '#1b4be9', '#00e6ee', 'rgb(199, 3, 3)', '#f78606', '#00b84c', '#000000', '#082a5c'];
    }
    componentDidMount(){   
        this.elems = this.props.element || this.elems;
        this.colors = this.props.colors || this.colors;     
        this.renderBackground();
        window.addEventListener('resize', this.renderBackground);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.renderBackground);
    }
    renderBackground(){
        this.$bck.empty();  
        let sectionsQty;
        if (window.innerWidth < 769)
            sectionsQty = 5;
        else if(window.innerHeight < 994)     
            sectionsQty = 10;
        else 
            sectionsQty = 15;
        const sectionsWidth = window.innerWidth / sectionsQty;
        for (let i = 1; i <= sectionsQty; i++){
            const section = i * sectionsWidth;
            const qty = Math.round(Math.random() * 7 + 3);
            for (let j = 0; j < qty; j++){
                const randomElem = Math.round(Math.random() * this.elems.length);
                const randomAnim = Math.round(Math.random() * this.animates.length);
                const randomColor = Math.round(Math.random() * this.colors.length);
                const top = window.innerHeight * Math.random();
                const left = section * Math.random();
                const elem = $(`<i class="${this.elems[randomElem]} ${this.animates[randomAnim]}" />`).css({
                    top: top + 'px',
                    left: left + 'px',
                    color: this.colors[randomColor],
                })
                this.$bck.append(elem)
            }
        }
    }
    render(){
        return (
            <div ref={el => this.$bck = $(el)} className='own-background'></div>
        )
    }
}

