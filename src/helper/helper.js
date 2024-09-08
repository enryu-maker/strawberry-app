import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const baseURL = 'https://api-strawberry.nerdtech.in/api'

let headers = {}
const axiosIns = axios.create({
    baseURL: 'https://api-strawberry.nerdtech.in/api',
    headers
})

axiosIns.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('access')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error.msg)
    }
)

axiosIns.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response)
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
        if (error.response.status === 401) {
            toast.error('Access denied! Permission slip required.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light'
            })
        } else {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }
)

export default axiosIns
