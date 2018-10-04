import React, { Component } from 'react';
import './App.css';
import Player from '../Player/player';

class App extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			begun: false,
			deckId: '',
			cardsToDeal: [],
			playerHand: [],
			playerScore: 0,
			dealerHand: [],
			dealerScore: 0
		}
		
		this.startGame = this.startGame.bind( this );
		this.initializeHands = this.initializeHands.bind( this );
		this.dealCards = this.dealCards.bind( this );
	}
	
	// lifecycle functions
	
	componentDidMount() {
		// load deck
		fetch( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' )
			.then( response => response.json() )
			.then( data => this.setState({ deckId: data.deck_id }) );
	}
	
	// custom functions
	
	startGame() {
		this.setState({
			begun: true
		});
		this.initializeHands();
	}
	
	initializeHands () {
		this.dealCards( 2, 'player' );
		this.dealCards( 2, 'dealer' );
	};
	
	dealCards( numberOfCards, target ) {
		// first draw cards
		const urlToGetCards = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/draw/?count=' + numberOfCards;
		fetch( urlToGetCards )
			.then( response => response.json() )
			.then( data => {
				// then deal cards
				let urlToAddCardsToHand = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/add/?cards=' + data.cards.map( card => card.code ).join(',');
				fetch( urlToAddCardsToHand )
					.then( response => response.json() )
					.then( data => {
						fetch( 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/list' )
							.then( response => response.json() )
							.then( data => {
								if( target === 'player' ) {
									this.setState({
										playerHand: this.state.playerHand.concat( data.piles.playerHand.cards )
									});
									console.log( numberOfCards + ' cards dealt to ' + target + '.');
								} else if ( target === 'dealer' ) {
									this.setState({
										dealerHand: this.state.dealerHand.concat( data.piles.dealerHand.cards )
									})
									console.log( numberOfCards + ' cards dealt to ' + target + '.');
								}
							})			
						})
					}).catch( error => console.log( 'Cards not dealt.' ) );
				}
	
	scoreOf( target ) {
		let hand = ( target === 'player' ) ? this.state.playerHand : this.state.dealerHand;
		// establish value of each card based on card.value
		
		const cardValue = ( card ) => {
			switch( card.value ) {
				case 'ACE':
					return [1, 11];
					break;
				case 
			}
		}
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
						<Player type={ "Dealer" } hand={ this.state.dealerHand } />
						<Player type={ "Player" } hand={ this.state.playerHand } />
					</div>
				)
			}
		};
		
		return (
			<main style={{ "textAlign": "center" }} > 
				<h1 style={{ "textAlign": "center" }}>Blackjack</h1>
				{ renderNewGame() }
			</main>
		);
	}
}

export default App;
