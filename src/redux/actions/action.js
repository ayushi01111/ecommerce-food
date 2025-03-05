export const addToCart = (item) => {
    return  {
        type: "ADD_CART",
        payload: item
    }
}
export const removeItem = (id) => {
    return  {
        type: "REMOVE_ITEM",
        payload: id
    }
}
export const decrementItem = (item) => {
    return  {
        type: "DECREMENT_ITEM",
        payload: item
    }
}