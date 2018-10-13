import React, { Component } from 'react';
import './App.css';
import Player from '../Player/player';
import ActionBar from '../ActionBar/actionbar';

class App extends Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			begun: false,
			deckId: '',
			playerHand: [],
			playerScore: 0,
			dealerHand: [],
			dealerScore: 0,
			isDealersTurn: false,
			winner: ''
		}
		
		this.startGame = this.startGame.bind( this );
		this.initializeHands = this.initializeHands.bind( this );
		this.dealCards = this.dealCards.bind( this );
		this.getValueOf = this.getValueOf.bind( this );
		this.getScoreOf = this.getScoreOf.bind( this );
		this.dealCards = this.dealCards.bind( this );
		this.saveHandStateOf = this.saveHandStateOf.bind( this );
		this.playerBusts = this.playerBusts.bind( this );
		this.startDealersTurn = this.startDealersTurn.bind( this );
		this.evaluateWinner = this.evaluateWinner.bind( this );
		this.setWinner = this.setWinner.bind( this );
		this.gameOver = this.gameOver.bind( this );
	}
	
	// lifecycle functions
	
	componentDidMount() {
		// load deck
		fetch( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' )
			.then( response => response.json() )
			.then( data => {
				this.setState({ deckId: data.deck_id });
			})
		// this.initializeHands();
	}

	componentDidUpdate() {
		if( this.state.isDealersTurn === true ) {
			if( this.state.dealerScore <= 16 ) {
				this.dealCards( 1, 'dealer' )
			}	
			this.setState( prevState => {
				return { isDealersTurn: !prevState.isDealersTurn }
			});
			this.setWinner();	
		}
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
					.then( data => this.saveHandStateOf( target ) )
					}).catch( error => console.log( 'Cards not dealt.' ) );
	}

	// new function
	saveHandStateOf( target ) {
		fetch( 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/list' )
			.then( response => response.json() )
			.then( data => {
				if( target === 'player' ) {
					this.setState({
						playerHand: data.piles.playerHand.cards
					})
					this.getScoreOf( target )
				} else if ( target === 'dealer' ) {
					this.setState({
						dealerHand: data.piles.dealerHand.cards
					})
					this.getScoreOf( target );
				}
		}).catch( error => 'Hand not retrieved.' )
	}

	getScoreOf( target ) {
		let hand = target === 'player' ? this.state.playerHand : this.state.dealerHand;
		// establish value of each card based on card.value
		
		const handContainsAnAce = () => {
			return hand.some( card => card.value === 'ACE' );
		}

		let score = () => {
			return hand.map( card => this.getValueOf( card ) ).reduce( (a, c) => a + c, 0 ); 
		}

		let result = ( handContainsAnAce() && ( score() > 21 ) ) ? score() - 10 : score();

		if( target === 'player' ) {
			this.setState({
				playerScore: result
			})
		} else if ( target === 'dealer' ) {
			this.setState( ( prevState ) => {
				return {
					dealerScore: result
				}
			})
		}
	}

	// new function
	getValueOf( card = { value: null } ) {
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
	}
	
	playerBusts() {
		return this.state.playerScore > 21;
	}

	startDealersTurn() {
		this.setState( prevState => {
			return {
				isDealersTurn: !prevState.isDealersTurn
			}
		});
	};

	evaluateWinner() {
		if( this.state.playerScore > 21 ) {
			return 'Dealer';
		} else if( this.state.dealerScore > 21 && this.state.playerScore <= 21 ) {
			return 'Player';
		} else if( this.state.playerScore < 21 && 
			( this.state.dealerScore > this.state.playerScore && this.state.dealerScore <= 21 ) ) {
				return 'Dealer';
		} else if ( this.state.playerScore > this.state.dealerScore && this.state.playerScore <= 21 ) {
			return 'Player';
		} else if( this.state.playerScore === this.state.dealerScore ) {
			return "none";
		}
	}

	setWinner() {
		let winner = this.evaluateWinner();
		this.setState({
			winner: winner,
		})
		console.log( this.state.winner );
	}

	gameOver() {
		return this.state.winner !== '' || this.playerBusts() === true;
	}
	
	render() {
		const playerScore = this.state.playerScore;
		const dealerScore = this.state.dealerScore;
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
							isDealersTurn={ this.state.isDealersTurn }
							gameOver={ this.gameOver() }
						/>
						<Player
							type={ 'player' }
							hand={ this.state.playerHand }
							score={ playerScore }
						/>
						<ActionBar
							dealerScore={ dealerScore }
							playerScore={ playerScore }
							startGame={ this.startGame }
							hit={ this.dealCards }
							isDealersTurn={ this.state.isDealersTurn }
							startDealersTurn={ this.startDealersTurn }
							winner={ this.state.winner }
							busted={ this.playerBusts }
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
