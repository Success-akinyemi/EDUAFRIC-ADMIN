import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

export async function signin(formData) {
    try {
        const res = await axios.post('/admin/login', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to login user'
        return res?.data
    }
}
