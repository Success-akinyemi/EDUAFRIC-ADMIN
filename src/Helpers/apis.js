import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://eduafric.onrender.com/api'

export async function signup(formData) {
    try {
        const res = await axios.post('/admin/register', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to register user'
        return res?.data
    }
}

export async function verifyOtp(formData) {
    try {
        const res = await axios.post('/auth/verifyOtp', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to verify OTP user'
        return res?.data
    }
}

export async function signin(formData) {
    try {
        const res = await axios.post('/admin/login', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to login user'
        return res?.data
    }
}

export async function forgotPassword(formData) {
    try {
        const res = await axios.post('/admin/forgotPassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process forgot password'
        return res?.data
    }
}

export async function resetPassword(formData) {
    try {
        const res = await axios.post(`/admin/resetPassword/${formData?.token}`, formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process forgot password'
        return res?.data
    }
}

export async function signout(formData) {
    try {
        const res = await axios.post('/admin/signout', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to signout user'
        return res?.data
    }
}

//BLOCK AND UNBLOCK STUDENT
export async function blackListStudent({ id }) {
    try {
        const res = await axios.post('/student/toggleblock', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//BLOCK AND UNBLOCK INSRTUCTOR
export async function blackListInstructor({ id }) {
    try {
        const res = await axios.post('/instructor/toggleblock', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//APPROVE INSRTUCTOR COURSE
export async function approveCourse({ id }) {
    try {
        const res = await axios.post('/course/approveCourse', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to approve instructors course'
        return res?.data
    }
}

//BLOCK AND UNBLOCK INSRTUCTOR
export async function rejectCourse(formData) {
    try {
        const res = await axios.post('/course/rejectCourse', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reject instructors course'
        return res?.data
    }
}

//BLOCK AND UNBLOCK ORGANIZATION
export async function blackListOrganization({ id }) {
    try {
        const res = await axios.post('/organization/toggleblock', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}