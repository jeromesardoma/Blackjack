import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App/App';
import * as APICalls from '../components/App/APICalls';
import { mount } from 'enzyme';

jest.mock( '../components/App/APICalls' );

describe( 'App', () => {

  it( 'loads a new deck successfully', () => {
    mount( <App /> );
    expect( APICalls.newDeckRequest ).toHaveBeenCalledTimes(1); 
  })

})
