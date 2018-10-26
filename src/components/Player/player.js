import React, { Component } from 'react'; 
import './player.css';

class Player extends Component {
	constructor( props ) {
		super( props );
		
	}

	render () {
        const {
            hand,
            gameOver,
            type,
            score
        } = this.props;
		const cards = hand.map( (card, index ) => {
			if( gameOver === true && type === 'dealer' ) {
				return(
					<img
						src={ card.image }
						alt={ card.code } 
						key={ card.code }
						style={{ "height": 150 }}></img>
				)
			} else {
				return(
					<img 
						src={ ( index === 0 && type === 'dealer' ) ? 'facedowncardv2.png' : card.image } 
						alt={ card.code } 
						key={ card.code }
						style={{ "height": 150 }}></img>	
				)
			}
		});			
		return(
			<div>
				<h3>{ type.substr(0,1).toUpperCase() + type.substr(1) }</h3>
				{ gameOver === false ? null : <h5>Score: { score }</h5> }
				<section>
					{ cards }
				</section>
			</div>
		)
	};
	
}

export default Player; 
