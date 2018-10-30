import React from 'react';
import App from '../components/App/App';
import Player from '../components/Player/player';
import { newDeckRequest } from '../components/App/newDeckRequest';
import { dealCardsRequest } from '../components/App/dealCardsRequest';
import { shallow, mount } from 'enzyme';

jest.mock( '../components/App/newDeckRequest' );
jest.mock( '../components/App/dealCardsRequest' );

// unit tests for now!

describe( 'Player', () => {

    let wrapper; // instantiate wrapper outside of beforeEach scope, so that the it calls
                 // can access it
    
    beforeEach( () => {
        wrapper = mount( <App /> );
        // simulate click on "New Game" button to begin game
        wrapper.find( "button" ).simulate( "click" );  
    })

    afterEach( () => {
        wrapper.unmount();
    })

    
    // let testDealer = wrapper.find( '[type="dealer"]' );
    // console.log( testPlayer, testDealer );

    describe( 'Human Player', () => {

        it( 'testPlayer exists', () => {
            let testPlayer = wrapper.find( '[type="player"]' );
            expect( testPlayer.props() ).not.toBeNull;
            console.log( testPlayer.props() );
        })
        
    })

    // player
    // -- score changes after being dealt a card
    // -- card count increases by one after being dealt a card

    // dealer
    // -- dealer's score doesn't show when it's the player's turn
    // -- dealer has only one card face up when it's the player's turn
    // -- dealer's score is visible on dealer's turn
    // -- dealer's cards are all visible on dealer's turn
    // -- score changes after being dealt a card
    // -- card count increases by one after being dealt a card
    })

    describe( 'ActionBar', () => {
        // contains a 'hit' button on player's turn
        // contains a 'stay' button on player's turn
        // doesn't contain a 'hit' button on dealer's turn
        // doesn't contain a 'stay' button on dealer's turn
        // renders 'You Lose' if dealer wins
        // renders 'You Win' if player wins
        // renders 'Tie Game' if game is tied
})


