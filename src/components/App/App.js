import React, { Component } from 'react';
import './App.css';
import Player from '../Player/player';
import ActionBar from '../ActionBar/actionbar';
import ReactDOM from 'react-dom';
import { newDeckRequest } from './newDeckRequest';
import { dealCardsRequest } from './dealCardsRequest';

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
        
        // binds for imported functions
        this.newDeckRequest = newDeckRequest.bind( this );
        this.dealCardsRequest = dealCardsRequest.bind( this );

        // binds for functions in App scope
		this.startGame = this.startGame.bind( this );
		this.initializeHands = this.initializeHands.bind( this );
		// this.dealCards = this.dealCards.bind( this );
		this.getValueOf = this.getValueOf.bind( this );
		this.getScoreOf = this.getScoreOf.bind( this );
		this.saveHandStateOf = this.saveHandStateOf.bind( this );
		this.playerBusts = this.playerBusts.bind( this );
		this.startDealersTurn = this.startDealersTurn.bind( this );
		this.evaluateWinner = this.evaluateWinner.bind( this );
		this.setWinner = this.setWinner.bind( this );
		this.gameOver = this.gameOver.bind( this );
		this.startNewGame = this.startNewGame.bind( this );
	}
	
	// lifecycle functions
	
	componentDidMount() {
		
		this.newDeckRequest();
	}

	componentDidUpdate( prevState ) {
		if( this.state.isDealersTurn === true ) {
			if( this.state.dealerScore < 17 ) {
				this.dealCards( 1, 'dealer' );
			} else if( this.state.dealerScore >= 17 ) {
				this.setState( prevState => {
					return {
						isDealersTurn: !prevState.isDealersTurn
					}
				})
				this.setWinner();
			}	
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
		this.dealCardsRequest( 2, 'player' );
		this.dealCardsRequest( 2, 'dealer' );
	};
	
/* 	dealCards( numberOfCards, target ) {
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
	} */

	saveHandStateOf( target ) {
		fetch( 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/list' )
			.then( response => response.json() )
			.then( data => {
				if( target === 'player' ) {
					this.setState( prevState => {
						return {
							playerHand: data.piles.playerHand.cards,
							playerScore: this.getScoreOf( data.piles.playerHand.cards )
						}
					})
				} else if ( target === 'dealer' ) {
					this.setState( prevState => {
						return {
							dealerHand: data.piles.dealerHand.cards,
							dealerScore: this.getScoreOf( data.piles.dealerHand.cards )
						}
					})
				}
		}).catch( error => 'Hand not retrieved.' )
	}

	getScoreOf( hand ) {
		const handContainsAnAce = () => {
			return hand.some( card => card.value === 'ACE' );
		}
		let score = () => {
			return hand.map( card => this.getValueOf( card ) ).reduce( (a, c) => a + c, 0 ); 
		}
		let result = ( handContainsAnAce() && ( score() > 21 ) ) ? score() - 10 : score();
		return result;
	}

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

	startNewGame() {
		ReactDOM.unmountComponentAtNode( document.getElementById( "root" ) );
		ReactDOM.render( <App />, document.getElementById( "root" ) );
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
							startGame={ this.startGame }
							hit={ this.dealCards }
							isDealersTurn={ this.state.isDealersTurn }
							startDealersTurn={ this.startDealersTurn }
							winner={ this.state.winner }
							busted={ this.playerBusts }
							startNewGame={ this.startNewGame }
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