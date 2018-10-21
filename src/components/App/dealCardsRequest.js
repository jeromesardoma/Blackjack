// all functions must not use arrow syntax, if wrapped in a class
export function dealCardsRequest( numberOfCards, target ) {
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

