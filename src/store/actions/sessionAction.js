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

export const getCustum = (id, setLoading, setData) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .get(baseURL + '/get-item-customizations/', {
                params: {
                    menu_item_id: id
                }
            })
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setLoading(false)
                setData(res?.data)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
}


export const getOrder = (id, setLoading, setData) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .get(baseURL + `/get-orders/`, {
                params: {
                    order_session: id
                }
            })
            .then((res) => {
                setLoading(false)
                setData(res?.data)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
}

export const createPayment = (order_id, userid, payment_mode, amount, setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + `/payments/create/`, {
                "order_session": order_id,
                "order_session_user": userid,
                "payment_mode": payment_mode,
                "amount": amount
            })
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                // setData(res?.data)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
}

export const getMode = (setData, setLoading, order_session, order_session_user) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .get(baseURL + '/payments/modes/', {
                params: {
                    order_session: order_session,
                    order_session_user: order_session_user
                }
            })
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                setData(res?.data)
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }
}