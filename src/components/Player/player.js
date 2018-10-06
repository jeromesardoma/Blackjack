import React, { Component } from 'react'; 

class Player extends Component {
	constructor( props ) {
		super( props );
		
	}
	
	componentDidUpdate() {
		console.log( this.props.type + "'s hand: " + this.props.hand.map( card => card.code ).join(', ') );
	}
	
	render () {
		const cards = this.props.hand.map( card => 
			<img src={ card.image } 
				alt={ card.code } 
				key={ card.code }
				style={{ "height": 200 }}></img>
		);			
		return(
			<div>
				<h3>{ this.props.type }</h3>
				<h5>{ 'Score: ' + this.props.score }</h5>
				<section>
					{ cards }
				</section>
			</div>
		)
	};
	
}

export default Player; 
