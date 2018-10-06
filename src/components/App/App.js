import React, { Component } from 'react';
import './App.css';
import Player from '../Player/player';

class App extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			begun: false,
			deckId: '',
			playerHand: [],
			playerScore: 0,
			dealerHand: [],
			dealerScore: 0
		}
		
		this.startGame = this.startGame.bind( this );
		this.initializeHands = this.initializeHands.bind( this );
		this.dealCards = this.dealCards.bind( this );
		this.getHandOf = this.getHandOf.bind( this );
		this.getScoreOf = this.getScoreOf.bind( this );
	}
	
	// lifecycle functions
	
	componentDidMount() {
		// load deck
		fetch( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' )
			.then( response => response.json() )
			.then( data => {
				this.setState({ deckId: data.deck_id });
				this.initializeHands();
			})
	}
	
	// custom functions
	
	startGame() {
		this.setState({
			begun: true
		});
	}
	
	initializeHands () {
		this.dealCards( 2, 'player' );
		this.dealCards( 2, 'dealer' )
	};
	
	dealCards( numberOfCards, target ) {
		// first draw cards
		const urlToGetCards = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/draw/?count=' + numberOfCards;
		fetch( urlToGetCards )
			.then( response => response.json() )
			.then( data => {
				// then deal cards
				let urlToAddCardsToHand = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/add/?cards=' + data.cards.map( card => card.code ).join(',');
				return fetch( urlToAddCardsToHand )
					.then( response => response.json() )
					.then( data => this.getHandOf( target ) )
					}).catch( error => console.log( 'Cards not dealt.' ) );
	}
	
	getHandOf( target ) {
		fetch( 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/list' )
			.then( response => response.json() )
			.then( data => {
				if( target === 'player' ) {
					this.setState({
						playerHand: this.state.playerHand.concat( data.piles.playerHand.cards ),
					});
					console.log( target + "'s cards are " + data.piles.playerHand.cards.map( card => card.code ).join(','));
				} else if ( target === 'dealer' ) {
					this.setState({
						dealerHand: this.state.dealerHand.concat( data.piles.dealerHand.cards ),
					})
					console.log( target + "'s cards are " + data.piles.dealerHand.cards.map( card => card.code ).join(','));
				}
				this.getScoreOf( target );
			}).catch( error => 'Hand not retrieved.' )
		
	}
	
	getScoreOf( target ) {
		let hand = target === 'player' ? this.state.playerHand : this.state.dealerHand;
		// establish value of each card based on card.value
		
		const handContainsAnAce = () => {
			return hand.some( card => card.value === 'ACE' );
		}

		let score = () => {
			return hand.map( card => {
				switch( card.value ) {
					case 'ACE':
						return 11;
						// if target has an ace, and score is greater than 21, subtract 10 from score
						break;
					case 0:
						return 10;
						break;
					case 'JACK':
						return 10;
						break;
					case 'QUEEN':
						return 10;
						break;
					case 'KING':
						return 10;
						break;
					default:
						return Number( card.value );
						break;
				}
			} ).reduce( (a, c) => a + c, 0 ); 
		}

		let result = ( handContainsAnAce() && ( score() > 21 ) ) ? score() - 10 : score();
			
		if( target === 'player' ) {
			this.setState({
				playerScore: this.state.playerScore + result
			})
		} else if ( target === 'dealer' ) {
			this.setState({
				dealerScore: this.state.dealerScore + result
			})
		}
	}
	
	render() {
		const renderGame = () => {
			if( this.state.begun === false ) {
				return(
					<button onClick={ this.startGame }>New Game</button>
				)
			} else {
				return(
					<div className="App">
						<Player
							type={ 'dealer' }
							hand={ this.state.dealerHand }
							score={ this.state.dealerScore }
						/>
						<Player
							type={ 'player' }
							hand={ this.state.playerHand }
							score={ this.state.playerScore }
						/>
					</div>
				)
			}
		}
		return (
			<main style={{ "textAlign": "center" }} >
				<h1 style={{ "textAlign": "center" }}>Blackjack</h1>
				{ renderGame() }
			</main>
		);
	}
}

export default App;
