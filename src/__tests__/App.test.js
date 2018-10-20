import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App/App';
import { newDeckRequest } from '../components/App/newDeckRequest';
import { mount } from 'enzyme';

jest.mock( '../components/App/newDeckRequest' );

describe( 'App', () => {

  it( 'loads a new deck successfully', () => {
    mount( <App /> );
    expect( newDeckRequest ).toHaveBeenCalledTimes(1); 
  })

})
