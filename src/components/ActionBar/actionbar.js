import React, { Component } from 'react'; 

class ActionBar extends Component {
	constructor( props ) {
		super( props );

	}
	
	render () {
		const playerScore = this.props.playerScore;
		const dealerScore = this.props.dealerScore;
		const winner = this.props.winner;
		const renderActionBar = () => {
			if( winner === 'Dealer' || this.props.busted() === true ) {
				return(
					<div>
						<p>You Lose. Play Again?</p>
						<button onClick={ this.props.startGame }>New Game</button>
					</div>
				)
			} else if( winner === 'Player' ) {
				return(
					<div>
						<p>You Win! Play Again?</p>
						<button onClick={ this.props.startGame }>New Game</button>
					</div>
				)	
			} else if( winner === 'none' ) {
				return(
					<div>
						<p>Tie game. Play Again?</p>
						<button onClick={ this.props.startGame }>New Game</button>
					</div>
				)	
			} else if( this.props.isDealersTurn === false ) {
				return(
					<div>
						<button onClick={ () => { this.props.hit( 1, 'player' ) } }>Hit</button>
						<button onClick={ () => { this.props.startDealersTurn() } } >Stay</button>
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
