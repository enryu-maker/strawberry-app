import axios from 'axios'
import { baseURL } from '../../helper/helper'
import { toast } from 'react-toastify'

export const loginAction = (data, setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + '/login/', data)
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                // localStorage.setItem('token', res.data.token)
                // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            })
            .catch((err) => {
                setLoading(false)
                console.log(err.response.data.msg)
                toast.error(err.response.data.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'SUSE'
                    }
                })
            })
    }
}

export const registerAction = (data, setLoading) => {
    setLoading(true)
    return async (dispatch) => {
        await axios
            .post(baseURL + '/register/', data)
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                toast.success(res.data.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'SUSE'
                    }
                })
                // localStorage.setItem('token', res.data.token)
                // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            })
            .catch((err) => {
                setLoading(false)
                console.log(err.response.data.msg)
                toast.error(err.response.data.msg, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    style: {
                        fontFamily: 'SUSE'
                    }
                })
            })
    }
}
