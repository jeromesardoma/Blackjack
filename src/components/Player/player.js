import React, { Component } from 'react'; 

class Player extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			hand: []
		}
		
	}
	
	componentWillReceiveProps( nextProps ) {
		// to prevent same hand from showing twice on initialization?
		if( nextProps.hand !== this.props.hand ) {
			this.setState({
				hand: this.state.hand.concat( nextProps.hand )
			});
		}
	}
	
	componentDidUpdate() {
		console.log( this.props.type + "'s hand: " + this.state.hand.map( card => card.code ).join(', ') );
	}
	
	render () {
		const cards = this.state.hand.map( card => 
			<img src={ card.image } alt={ card.code } key={ card.code }></img>
		);			
		return(
			<div>
				<h3>{ this.props.type }</h3>
				<section>
					{ cards }
				</section>
			</div>
		)
	};
	
}

export default Player; 
