// actual new deck request call
// all functions must not use arrow syntax, if wrapped in a class

export const newDeckRequest = async () => {
    const response = await fetch( 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1' );
    const data = await response.json();
    return data;

    // set state within app
}

