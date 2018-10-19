// all functions must not use arrow syntax, if wrapped in a class
export function newDeckRequest() {
    fetch( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' )
        .then( response => response.json() )
        .then( data => {
            this.setState({ deckId: data.deck_id });
        })
}

