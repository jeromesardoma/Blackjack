const getDeck() => {
    return fetch( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' )
                .then( res => res.json() )
}

export default getDeck