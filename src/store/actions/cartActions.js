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

export const addcustom = (id, customizationId, customizationQty) => {
    return async (dispatch) => {
        dispatch({
            type: 'CUSTOM',
            payload: {
                id: id,
                customizationId: customizationId,
                customizationQty: customizationQty
            }
        })
    }
}
export const addnotes = (id, notes) => {
    return async (dispatch) => {
        dispatch({
            type: 'ADD_NOTES',
            payload: {
                id: id,
                notes: notes,
            }
        })
    }
}

