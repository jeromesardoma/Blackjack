// test for new deck request call 
import { newDeckRequest } from '../components/App/newDeckRequest';

jest.mock( '../components/App/newDeckRequest' );

describe( 'new deck request', () => {
    it( 'retrieves a new deck successfully', async ( done ) => {
        expect.assertions(1);
        await expect( newDeckRequest() ).resolves.toEqual({
            "success": true,
            "deck_id": "3p40paa87x90",
            "shuffled": true,
            "remaining": 52  
        })
        done();
    })

    it( 'throws an error if it does not retrieve deck', async ( done ) => {
        expect.assertions(1);
        await expect( newDeckRequest() ).rejects.toEqual( Error ('Error fetching deck.') );
        done(); 
    })
})