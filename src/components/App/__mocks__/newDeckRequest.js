// newDeckRequest mock implementation
// all functions must not use arrow syntax, if wrapped in a class
export const newDeckRequest = jest.fn()
    // on successful call
    .mockImplementation( async () => {
        return {
            "success": true,
            "deck_id": "3p40paa87x90",
            "shuffled": true,
            "remaining": 52
        }
    })


