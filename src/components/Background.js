import React, {Component} from 'react';
import $ from 'jquery';
import '../styles/Background.css';

class Background extends Component{
    constructor(){
        super();
        this.renderBackground = this.renderBackground.bind(this);
    }
    componentDidMount(){
        this.elems = ['fas fa-star', 'fas fa-moon', 'far fa-moon', 'fas fa-coffee', 
            'fas fa-binoculars', 'fab fa-affiliatetheme', 'fab fa-android', 'fab fa-apple',
            'fas fa-globe'
        ];
        this.animates = ['anim1', 'anim2', 'anim3', 'anim4', 'no-anim'];
        this.colors = ['purple', 'blue', 'aqua', 'red', 'gold', 'green', 'black', 'dark-blue'];
        this.renderBackground();
        window.addEventListener('resize', this.renderBackground);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.renderBackground);
    }
    renderBackground(){
        this.$bck.empty();       
        let qty = window.innerHeight / 80 * window.innerWidth / 80;
        for (let i = 0; i < qty; i++){
            const section = Math.random() * 3000;
            const randomElem = Math.round(Math.random() * this.elems.length);
            const randomAnim = Math.round(Math.random() * this.animates.length);
            const randomColor = Math.round(Math.random() * this.colors.length);
            let top;
            let left;
            if (section < 1000)
                top = this.calculateTop(null, 3),
                left = window.innerWidth / 3 * Math.random()
            else if (section < 2000)
                top = this.calculateTop(null, 2),
                left = window.innerWidth / 2 * Math.random()
            else{
                top = this.calculateTop(null, 1),
                left = window.innerWidth * Math.random()
            }
            const elem = $(`<i class="${this.elems[randomElem]} ${this.animates[randomAnim]} ${this.colors[randomColor]}" />`).css({
                top: top + 'px',
                left: left + 'px'
            })
            this.$bck.append(elem)
        }
    }
    calculateTop(num, section){
        let val = num || window.innerHeight * Math.random()
        if (val + 40 > window.innerHeight || val < 40)
            return this.calculateTop(window.innerHeight * Math.random(), section)
        return val
    }
    calculateLeft(num, section){
        let val = num || window.innerHeight / section * Math.random()
        if (val + 40 > window.innerWidth)
            return this.calculateLeft(val, section)
        return 
            return val
    }
    render(){
        return (
            <div ref={el => this.$bck = $(el)} className='own-background'></div>
        )
    }
}
export default () => {
    if (window.innerWidth > 768)
        return <Background />
    return <div></div>
}
