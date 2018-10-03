import React, { Component } from 'react'; 

class Player extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			hand: this.props.hand
		}
		
	}
	

	
	render () {
		const renderCards = () => {
			let cards = this.state.hand.map( (card) => {
				<img alt="card" key={ card.code } src={ card.image }></img>
			});
			console.log( cards );
			return cards;
		}
		return(
			<div>
				<h3>{ this.props.type }</h3>
				<section>
					{ renderCards() }
				</section>
			</div>
		)
	};
	
}

export default Player; 
