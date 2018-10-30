import React from 'react';
import App from '../components/App/App';
import Player from '../components/Player/player';
import ActionBar from '../components/ActionBar/actionbar';
import { newDeckRequest } from '../components/App/newDeckRequest';
import { dealCardsRequest } from '../components/App/dealCardsRequest';
import { shallow, mount } from 'enzyme';

jest.mock( '../components/App/newDeckRequest' );
jest.mock( '../components/App/dealCardsRequest' );

// unit tests for now!

describe( 'App', () => {

    let wrapper; // instantiate wrapper outside of beforeEach scope, so that the it calls
                 // can access it
    beforeEach( () => {
        wrapper = mount( <App /> );
        // simulate click on "New Game" button to begin game
        wrapper.find( "button" ).simulate( "click" );
    })

    afterEach( () => {
        // unmount after each test so it doesn't persist on subsequent tests
        wrapper.unmount();
    })

    it( 'at launch, renders two Player components when "New Game" is clicked', () => {
        expect( wrapper.find( Player ).length ).toEqual(2);
    });

    it( 'at launch, renders an ActionBar component when "New Game is clicked', () => {
        expect( wrapper.find( ActionBar ).length ).toEqual(1); 
    })

    // reloads a new game successfully when game is over

})
