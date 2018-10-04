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
		this.scoreOf = this.scoreOf.bind( this );
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
										playerHand: this.state.playerHand.concat( data.piles.playerHand.cards ),
										playerScore: this.state.playerScore + this.scoreOf( 'player' )
									});
									console.log( numberOfCards + ' cards dealt to ' + target + '.');
								} else if ( target === 'dealer' ) {
									this.setState({
										dealerHand: this.state.dealerHand.concat( data.piles.dealerHand.cards ),
										dealerScore: this.state.dealerScore + this.scoreOf( 'dealer' )
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
		
		const handContainsAnAce = () => {
			return hand.some( card => card.value === 'ACE' );
		}

		let score = () => {
			if( hand !== [] ) {
				return hand.map( card => {
					switch( card.value ) {
						case 'ACE':
							return 11;
							// if target has an ace, and score is greater than 21, subtract 10 from score
							break;
						case 0 || 'JACK' || 'QUEEN' || 'KING' :
							return 10;
							break;
						default:
							return card.value;
							break;
					}
				} ).reduce( (a, c) => a + c );
			}
		}
			
		return ( handContainsAnAce() && ( score() > 21 ) ) ? score() - 10 : score();
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
						<Player type={ "Dealer" } 
							hand={ this.state.dealerHand } 
							score={ this.scoreOf( 'dealer' ) } />
						<Player type={ "Player" } 
							hand={ this.state.playerHand }
							score={ this.scoreOf( 'player' ) } />
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
