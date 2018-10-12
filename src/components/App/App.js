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
<<<<<<< HEAD
		this.dealCards = this.dealCards.bind( this );
		this.getHandOf = this.getHandOf.bind( this );
		this.getValueOf = this.getValueOf.bind( this );
		this.getScoreOf = this.getScoreOf.bind( this );
=======
		// this.dealCards = this.dealCards.bind( this );
		this.dealCardTo = this.dealCardTo.bind( this );
		this.saveHandStateOf = this.saveHandStateOf.bind( this );
		// this.getHandOf = this.getHandOf.bind( this );
		// this.getScoreOf = this.getScoreOf.bind( this );
		this.getValueOf = this.getValueOf.bind( this );
>>>>>>> origin/redo-draw-card
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
				this.initializeHands();
			})
	}

	componentDidUpdate() {
		console.log( this.state.playerHand );
		console.log( this.state.playerScore );
		
/* 		if( this.state.isDealersTurn === true ) {
			if( this.state.dealerScore <= 16 ) {
				this.dealCards( 1, 'dealer' );
			} else if( this.state.dealerScore > 16 ) {
				// necessary to stop dealer from drawing cards
				this.setState( prevState => {
					return { isDealersTurn: !prevState.isDealersTurn }
				});
				this.setWinner();
			}
		} */
	}
	
	// custom functions
	
	startGame() {
		this.setState({
			begun: true
		});
	}
	
	initializeHands () {
		this.dealCardTo( 'player' );
		// this.dealCardTo( 'dealer' );
		// this.dealCardTo( 'player' );
		// this.dealCardTo( 'dealer' );
	};
	
	// remove
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
					.then( data => this.getHandOf( target ) )
					}).catch( error => console.log( 'Cards not dealt.' ) );
	}

	// new function 
	dealCardTo( target ) {
		// first draw card
		console.log( 'One card dealt to ' + target );
		const urlToGetCard = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/draw/?count=1'
		fetch( urlToGetCard )
			.then( response => response.json() )
			.then( data => {
				// then deal card
				let urlToAddCardToHand = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/add/?cards=' + data.cards[0].code;
				fetch( urlToAddCardToHand )
					.then( response => response.json() )
					.then( data => this.saveHandStateOf( target ) )
					}).catch( error => console.log( 'Card not dealt.' ) );
	}

	// new function
	saveHandStateOf( target ) {
		fetch( 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/list' )
			.then( response => response.json() )
			.then( data => {
				if( target === 'player' ) {
					this.setState( prevState => {
						return {
							// get the last object of cards and put in an array
							playerHand: prevState.playerHand.concat( data.piles.playerHand.cards ),
							playerScore: prevState.playerScore + this.getValueOf( data.piles.playerHand.cards[-1] )
							}
						})
				} else if ( target === 'dealer' ) {
					this.setState( prevState => {
						return {
							dealerHand: prevState.dealerHand.concat( data.piles.dealerHand.cards[0] ),
							dealerScore: prevState.dealerScore + this.getValueOf( data.piles.dealerHand.cards[-1] )
						}
					})
				}
				console.log( 'after save state, player hand is: ' + this.state.playerHand )
		}).catch( error => 'Hand not retrieved.' )
	}

	// remove
	getHandOf( target ) {
		fetch( 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/list' )
			.then( response => response.json() )
			.then( data => {
				if( target === 'player' ) {
					this.setState( ( prevState ) => {
						return {
							playerHand: prevState.playerHand.concat( data.piles.playerHand.cards )
								.slice( prevState.playerHand.length )
							}
					})
				} else if ( target === 'dealer' ) {
					this.setState( ( prevState ) => {
						return {
							dealerHand: prevState.dealerHand.concat( data.piles.dealerHand.cards )
								.slice( prevState.dealerHand.length )
							}
					})
				}
				this.getScoreOf( target );
			}).catch( error => 'Hand not retrieved.' )
	}

	// remove
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
			this.setState( prevState => {
				return { 
					playerScore: prevState.playerScore + (result - prevState.playerScore )
				 }
			})
		} else if ( target === 'dealer' ) {
<<<<<<< HEAD
			this.setState( ( prevState ) => {
				return {
					dealerScore: prevState.dealerScore + result
=======
			this.setState( prevState => {
				return {
					dealerScore: prevState.dealerScore + (result - prevState.dealerScore )
>>>>>>> origin/redo-draw-card
				}
			})
		}
	}

<<<<<<< HEAD
	getValueOf( card ) {
=======
	// new function
	getValueOf( card = { value: null } ) {
>>>>>>> origin/redo-draw-card
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
<<<<<<< HEAD
	}

	recalculateScoreOf( target ) {
		// get the value of the last card drawn
		// add the value of the last card drawn to the target's hand
		
	}
=======
	}	
	
>>>>>>> origin/redo-draw-card

	playerBusts() {
		return this.state.playerScore > 21;
	}

	startDealersTurn() {
		this.setState({
			isDealersTurn: true
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
							gameOver={ this.gameOver }
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
							hit={ this.dealCardTo }
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
