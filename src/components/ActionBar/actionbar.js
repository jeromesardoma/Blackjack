import React, { Component } from 'react'; 

class ActionBar extends Component {
	constructor( props ) {
		super( props );
		
	}
	
	render () {
		const playerScore = this.props.playerScore;
		const dealerScore = this.props.dealerScore;
		const renderActionBar = () => {
			if( playerScore > 21 ) {
				return(
					<div>
						<p>You Lose. Play Again?</p>
						<button onClick={ this.props.startGame }>New Game</button>
					</div>
				)
			}
			if( playerScore === 21 ) {
				return(
					<div>
						<p>You Win! Play Again?</p>
						<button onClick={ this.props.startGame }>New Game</button>
					</div>
				)	
			} else {
				return(
					<div>
						<span>Actions</span>
						<button onClick={ () => { this.props.hit( 1, 'player' ) } }>Hit</button>
						<button>Stay</button>
					</div>
				)
			}
		}
		return(
			<div>
				{ renderActionBar() }
			</div>
		)
	};
	
}

export default ActionBar; 
