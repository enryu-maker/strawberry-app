import axios from 'axios'
import { baseURL } from '../../helper/helper'

export const storeQRData = (rid, tid) => {
    return async (dispatch) => {
        try {
            localStorage.setItem('rid', rid)
            localStorage.setItem('tid', tid)
            dispatch({
                type: 'STORE_QR_DATA',
                payload: {
                    rid: rid,
                    tid: tid
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getRestaurant = (id) => {
    return async (dispatch) => {
        await axios
            .get(baseURL + `/get-restaurant-details`, {
                params: {
                    restaurant_id: id
                }
            })
            .then((response) => {
                dispatch({
                    type: 'SET_RESTAURANT',
                    payload: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const getMenu = (id) => {
    return async (dispatch) => {
        await axios
            .get(baseURL + `/get-menu`, {
                params: {
                    restaurant_id: id
                }
            })
            .then((response) => {
                dispatch({
                    type: 'SET_MENU',
                    payload: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
