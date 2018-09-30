import React, { Component } from 'react'; 

class Player extends Component {
	constructor( props ) {
		super( props );
		
	}
	
	render () {
		return(
			<h3>{ this.props.type }</h3>
		)
	};
	
}

export default Player; 
