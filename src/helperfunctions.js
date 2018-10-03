initializeHands = ( target ) => {
	// first get cards -- need card codes to add to player's hand
	const urlToGetCards = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/draw/?count=2';
	fetch( urlToGetCards )
		.then( response => response.json() )
		.then( data => {
			let drawnCards = data.cards;
		// then add drawn cards to pile
			let urlToAddCardsToHand = 'https://deckofcardsapi.com/api/deck/' + this.state.deckId + '/pile/' + target + 'Hand/add/?cards=' + drawnCards.map( card => card.code ).join(',');
			fetch( urlToAddCardsToHand )
				.then( response => response.json() )
				.then( data => ( target === 'player' ) ? 
					  // then initialize cards
					this.setState({
						playerHand: data.piles.playerHand.cards
					}) : this.setState({
						dealerHand: data.piles.dealerHand.cards
					})
					 )
			})
});	
