const INIT_STATE = {
    carts: []
};

export const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            const itemIndex = state.carts.findIndex((item)=> item.id == action.payload.id);
            if(itemIndex >= 0){
                const updatedCarts = state.carts.map((item, index) =>
                    index == itemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
                return {
                    ...state,
                    carts: updatedCarts
                }
            }
            else{
                const itemQty = {...action.payload, quantity: 1}
                return{
                    ...state,
                    carts:[...state.carts, itemQty]
                }
            }
        case "REMOVE_ITEM":
            const data = state.carts.filter((item)=> item.id !== action.payload);
            return{
                ...state,
                carts: data
            }
        case "DECREMENT_ITEM":
            const itemIndexDec = state.carts.findIndex((item) => item.id == action.payload.id);

            if (itemIndexDec >= 0 && state.carts[itemIndexDec].quantity > 1) {
                state.carts[itemIndexDec].quantity -= 1;
                return {
                    ...state,
                    carts: [...state.carts]
                };
            } 
            else if (state.carts[itemIndexDec].quantity == 1) {
                const updatedCartsDec = state.carts.filter((item) => item.id !== action.payload.id);
                return {
                    ...state,
                    carts: updatedCartsDec
                };
            }
            return state;            
        default:
            return state
    }
}