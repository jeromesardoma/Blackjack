import React, { Component } from 'react'; 

class ActionBar extends Component {
	constructor( props ) {
		super( props );

	}
	
	render () {
		const {
            winner,
            busted,
            startNewGame,
            isDealersTurn,
            hit,
            startDealersTurn
        } = this.props;
		const renderActionBar = () => {
			if( winner === 'Dealer' || busted() === true ) {
				return(
					<div>
						<p>You Lose. Play Again?</p>
						<button onClick={ () => { startNewGame() } }>New Game</button>
					</div>
				)
			} else if( winner === 'Player' ) {
				return(
					<div>
						<p>You Win! Play Again?</p>
						<button onClick={ () => { startNewGame() } }>New Game</button>
					</div>
				)	
			} else if( winner === 'none' ) {
				return(
					<div>
						<p>Tie game. Play Again?</p>
						<button onClick={ () => { startNewGame() } }>New Game</button>
					</div>
				)	
			} else if( isDealersTurn === false ) {
				return(
					<div>
						<button onClick={ () => { hit( 1, 'player' ) } }>Hit</button>
						<button onClick={ () => { startDealersTurn() } } >Stay</button>
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
