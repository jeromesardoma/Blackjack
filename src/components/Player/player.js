import React, { Component } from 'react'; 
import './player.css';

class Player extends Component {
	constructor( props ) {
		super( props );
		
	}
	
	componentDidMount() {

	}

	render () {
		const cards = this.props.hand.map( (card, index ) => {
			if( this.props.gameOver === true && this.props.type === 'dealer' ) {
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
						src={ ( index === 0 && this.props.type === 'dealer' ) ? 'facedowncardv2.png' : card.image } 
						alt={ card.code } 
						key={ card.code }
						style={{ "height": 150 }}></img>	
				)
			}
		});			
		return(
			<div>
				<h3>{ this.props.type.substr(0,1).toUpperCase() + this.props.type.substr(1) }</h3>
				{ this.props.gameOver === false ? null : <h5>Score: { this.props.score }</h5> }
				<section>
					{ cards }
				</section>
			</div>
		)
	};
	
}

export default Player; 
