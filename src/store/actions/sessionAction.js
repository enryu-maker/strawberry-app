import axios from 'axios'
import { baseURL } from '../../helper/helper'

export const startSession = (table_id, fpHash) => {
    return async (dispatch) => {
        await axios
            .post(baseURL + '/create-join-order-session/', {
                table_code: table_id,
                device_fingerprint: fpHash
            })
            .then((res) => {
                localStorage.setItem('session_id', res?.data?.order_session)
                localStorage.setItem('user_id', res?.data?.session_user)
                dispatch({ type: 'CREATE_SESSION', payload: res?.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
