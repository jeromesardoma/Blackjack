import React from 'react';
import App from '../components/App/App';
import Player from '../components/Player/player';
import { newDeckRequest } from '../components/App/newDeckRequest';
import { dealCardsRequest } from '../components/App/dealCardsRequest';
import { shallow, mount } from 'enzyme';

jest.mock( '../components/App/newDeckRequest' );
jest.mock( '../components/App/dealCardsRequest' );

// unit tests for now! 

describe( 'App', () => {

    it( 'at launch, renders two Player components when "New Game" is clicked', () => {
        const wrapper = mount( <App /> );
        wrapper.find( "button" ).simulate( "click" );
        expect( wrapper.find( Player ).length ).toEqual(2);
    });

})
