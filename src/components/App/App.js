import React, { Component } from 'react';
import './App.css';
import Player from '../Player/player';

class App extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			begun: false
		}
		
		this.startGame = this.startGame.bind( this ); 
		
	}
	
	startGame() {
		this.setState({
			begun: true
		})
	}
	
	render() {
		const renderNewGame = () => {
			if( this.state.begun === false ) {
				return(
					<button onClick={ this.startGame }>New Game</button>
				)
			} else {
				return(
					<div className="App">
						<Player type={ "Dealer" }/>
						<Player type={ "Player" }/>
					</div>
				)
			}
		};
		
		return (
			<main>
				<h1>Blackjack</h1>
				{ renderNewGame() }
			</main>
		);
	}
}

export default App;
