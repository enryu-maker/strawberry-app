import axios from 'axios'
import { baseURL } from '../../helper/helper'

export const Init = () => {
    return async (dispatch) => {
        try {
            const session_id = localStorage.getItem('session_id')
            const user_d = localStorage.getItem('user_id')
            const rid = localStorage.getItem('rid')
            const tid = localStorage.getItem('tid')
            dispatch({
                type: 'STORE_QR_DATA',
                payload: {
                    rid: rid,
                    tid: tid
                }
            })
            dispatch({
                type: 'CREATE_SESSION',
                payload: {
                    order_session: session_id,
                    session_user: user_d
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const startSession = (table_id, fpHash, setConnected) => {
    return async (dispatch) => {
        await axios
            .post(baseURL + '/create-join-order-session/', {
                table_code: table_id,
                device_fingerprint: fpHash
            })
            .then((res) => {
                localStorage.setItem('session_id', res?.data?.order_session)
                localStorage.setItem('user_id', res?.data?.session_user)
                setConnected(true)
                dispatch({ type: 'CREATE_SESSION', payload: res?.data })
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const createOrder = (data, navigate, setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + '/add-order-item/', data)
            .then((res) => {
                navigate('/success', {
                    state: res?.data
                })
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
