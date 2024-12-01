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
        console.log('ERRORO',error)
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

//EDIT ADMIN PROFILE
export async function editProfile(formData) {
    try {
        const res = await axios.post('/admin/editProfile', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to edit user profile'
        return res?.data
    }
}

//UPDATE ADMIN PASSWORD
export async function updatePassword(formData) {
    try {
        const res = await axios.post('/admin/updatePassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update password'
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

//SITE SETTINGS
export async function siteSetting(formData) {
    try {
        const res = await axios.post('/admin/siteSetting', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//ADD NEW COUNTRY
export async function newCountry(formData) {
    try {
        const res = await axios.post('/country/newCountry', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//UPDATE COUNTRY
export async function updateCountry(formData) {
    try {
        const res = await axios.post('/country/updateCountry', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//DELETE COUNTRT
export async function deleteCountry({ id }) {
    try {
        const res = await axios.post('/country/deleteCountry', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//BLOCK ADMIN STAFF ACCOUNT
export async function blockAccount({ _id }) {
    try {
        const res = await axios.post('/admin/blockAccount', { _id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//UNBLOACK ADMIN STAFF ACCOUNT
export async function unBlockAccount({ _id }) {
    try {
        const res = await axios.post('/admin/unBlockAccount', { _id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to perform block action on student'
        return res?.data
    }
}

//APPROVE ADMIN STAFF ACCOUNT
export async function approveAdmin(formData) {
    try {
        const res = await axios.post('/admin/approveAdmin', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        console.log('object error', error)
        const res = error.response || 'Unable to perform approval action on staff'
        return res?.data
    }
}

//EDIT ADMIN STAFF ACCOUNT
export async function adminEditStaff(formData) {
    try {
        const res = await axios.post('/admin/adminEditStaff', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        console.log('object error', error)
        const res = error.response || 'Unable to perform approval action on staff'
        return res?.data
    }
}

//DELETE ADMIN STAFF ACCOUNT
export async function deleteAccount({ _id }) {
    try {
        const res = await axios.post('/admin/deleteAccount', { _id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete staff account'
        return res?.data
    }
}

//ADD NEW CMS
export async function newCms(formData) {
    try {
        const res = await axios.post('/cms/newCms', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        console.log('objectddd', error)
        const res = error.response || 'Unable to create cms data'
        return res?.data
    }
}

//UPDATE CMS
export async function updateCms(formData) {
    try {
        const res = await axios.post('/cms/updateCms', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        console.log('objectddd', error)
        const res = error.response || 'Unable to update cms data'
        return res?.data
    }
}

//DELETE CMS
export async function deleteCms({ id }) {
    try {
        const res = await axios.post('/cms/deleteCms', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        console.log('objectddd', error)
        const res = error.response || 'Unable to delete cms data'
        return res?.data
    }
}