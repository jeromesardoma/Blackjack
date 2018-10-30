// newDeckRequest mock implementation
// all functions must not use arrow syntax, if wrapped in a class
export const newDeckRequest = jest.fn()
    // on successful call
    .mockImplementationOnce( async () => {
        return {
            "success": true,
            "deck_id": "3p40paa87x90",
            "shuffled": true,
            "remaining": 52
        }
    })
    // on unsuccessful call
    .mockImplementationOnce( async () => {
        // equivalent to 'await Promise.reject' 
        throw new Error('Error fetching deck.');
    }) 


