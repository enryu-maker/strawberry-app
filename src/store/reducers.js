const initialState = {
    access: null,
    restaurant_id: null,
    table_id: null,
    session_id: null,
    restaurant_data: {},
    menu: [],
    cart: [],
    user_id: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_QR_DATA':
            return {
                ...state,
                restaurant_id: action.payload.rid,
                table_id: action.payload.tid
            }
        case 'SET_RESTAURANT':
            return {
                ...state,
                restaurant_data: action.payload
            }
        case 'SET_MENU':
            return {
                ...state,
                menu: action.payload
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: state.cart
                    .map(
                        (item) =>
                            item.id === action.payload.id
                                ? {
                                      ...item,
                                      qty: item.qty + action.payload.qty
                                  } // If ID matches, update qty
                                : item // If ID doesn't match, return the item unchanged
                    )
                    .concat(
                        state.cart.some((item) => item.id === action.payload.id)
                            ? [] // Don't add the new item if it already exists
                            : action.payload // Add the new item if it doesn't exist
                    )
            }
        case 'UPDATE_QTY':
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, qty: action.payload.qty } // Update to the new quantity
                        : item
                )
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload) // Remove the item with the matching id
            }
        case 'CREATE_SESSION':
            return {
                ...state,
                session_id: action.payload.order_session,
                user_id: action.payload.session_user
            }
        default:
            return state
    }
}
