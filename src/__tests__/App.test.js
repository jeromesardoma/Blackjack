import React from 'react';
<<<<<<< HEAD
import { shallow } from 'enzyme';
import App from '.components/App';

it('renders without crashing', () => {
  shallow(<App />);
});
=======
import ReactDOM from 'react-dom';
import App from '../components/App/App';
import APICalls from '../components/App/APICalls';
import { mount } from 'enzyme';

jest.mock( '../components/App/APICalls' );

describe( 'App', () => {

  it( 'loads a new deck successfully', () => {
    const wrapper = mount( <App /> );
    expect( APICalls.newDeckRequest ).toHaveBeenCalledTimes(1); 
  })

})
>>>>>>> origin/adding-tests
