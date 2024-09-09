export const updateQty = (id, qty) => {
    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_QTY',
            payload: {
                id: id,
                qty: qty
            }
        })
    }
}
