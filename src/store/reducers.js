const initialState = {
    access: null,
    restaurant_id: null,
    table_id: null,
    session_id: null,
    restaurant_data: {},
    menu: []
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
        default:
            return state
    }
}
