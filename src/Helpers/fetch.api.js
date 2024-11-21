import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

//FETCH ALL STUDENT
export function fetchAllUsers(query){
    const [ userData, setUserData ] = useState({ isFetchingUser: true, userData: null, userDatastatus: null, userDataServerError: null, })
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/student/getAllStudent`, {withCredentials: true}) : await axios.get(`/student/getStudent/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setUserData({ isFetchingUser: false, userData: data, userDatastatus: status, userDataServerError: null})
                } else{
                    setUserData({ isFetchingUser: false, userData: null, userDatastatus: status, userDataServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setUserData({ isFetchingUser: false, userData: null, userDatastatus: null, userDataServerError: error})
            }
        }
        fetchUserData()
    }, [query])

    return userData
}

//FETCH A STUDENT ALL ORDERS
export function fetchStudentAllOrders(query){
    const [ oderData, setOrderData ] = useState({ isFetchingOrders: true, oderData: null, orderDataStatus: null, orderDataServerError: null, })
    
    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/orders/getStudentOrders/${query}`, {withCredentials: true}) : await axios.get(`/orders/getStudentOrders/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setOrderData({ isFetchingOrders: false, oderData: data, orderDataStatus: status, orderDataServerError: null})
                } else{
                    setOrderData({ isFetchingOrders: false, oderData: null, orderDataStatus: status, orderDataServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setOrderData({ isFetchingOrders: false, oderData: null, orderDataStatus: null, orderDataServerError: error})
            }
        }
        fetchOrdersData()
    }, [query])

    return oderData
}

//FETCH ALL INSTRUCTORS
export function fetchAllInstructors(query){
    const [ instructorsData, setInstructorsData ] = useState({ isFetchingInstructor: true, instructorsData: null, instructorsDatastatus: null, instructorsDataServerError: null, })
    
    useEffect(() => {
        const fetchInstructorsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/instructor/getAllInstructor`, {withCredentials: true}) : await axios.get(`/instructor/getInstructor/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setInstructorsData({ isFetchingInstructor: false, instructorsData: data, instructorsDatastatus: status, instructorsDataServerError: null})
                } else{
                    setInstructorsData({ isFetchingInstructor: false, instructorsData: null, instructorsDatastatus: status, instructorsDataServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setInstructorsData({ isFetchingInstructor: false, instructorsData: null, instructorsDatastatus: null, instructorsDataServerError: error})
            }
        }
        fetchInstructorsData()
    }, [query])

    return instructorsData
}

//FETCH A INSTRUCTORS ALL ORDERS
export function fetchInstructorsCourses({allCourse, id}){
    const [ courseData, setCourseData ] = useState({ isFetchingInstructorsData: true, instructorsCourseData: null, instructorsCourseStatus: null, instructorsCourseServerError: null, })
    
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const { data, status} = allCourse ? await axios.get(`/course/getInstructorCourses/${id}`, {withCredentials: true}) : await axios.get(`/course/getAInstructorCourse/${id}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCourseData({ isFetchingInstructorsData: false, instructorsCourseData: data, instructorsCourseStatus: status, instructorsCourseServerError: null})
                } else{
                    setCourseData({ isFetchingInstructorsData: false, instructorsCourseData: null, instructorsCourseStatus: status, instructorsCourseServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setCourseData({ isFetchingInstructorsData: false, instructorsCourseData: null, instructorsCourseStatus: null, instructorsCourseServerError: error})
            }
        }
        fetchCourseData()
    }, [allCourse, id])

    return courseData
}

//FETCH COURSE CONTENT FOR ADMIN
export function fetchCourseContentForAdmin(query){
    const [ courseContentData, setCourseContentData ] = useState({ isFetchingCourseContent: true, courseContentData: null, courseContentStatus: null, courseContentServerError: null, })
    
    useEffect(() => {
        const fetchCourseContentData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/courseContent/getCourseContentForAdmin`, {withCredentials: true}) : await axios.get(`/courseContent/getCourseContentForAdmin/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCourseContentData({ isFetchingCourseContent: false, courseContentData: data, courseContentStatus: status, courseContentServerError: null})
                } else{
                    setCourseContentData({ isFetchingCourseContent: false, courseContentData: null, courseContentStatus: status, courseContentServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setCourseContentData({ isFetchingCourseContent: false, courseContentData: null, courseContentStatus: null, courseContentServerError: error})
            }
        }
        fetchCourseContentData()
    }, [query])

    return courseContentData
}

//FETCH ALL ORGANIZATIONS
export function fetchAllOrganization(query){
    const [ organizationData, setOrganizationData ] = useState({ isFetchingOrganization: true, organizationData: null, organizationDatastatus: null, organizationServerError: null, })
    
    useEffect(() => {
        const fetchOrganizationData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/organization/getAllOrganizations`, {withCredentials: true}) : await axios.get(`/organization/getOrganization/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setOrganizationData({ isFetchingOrganization: false, organizationData: data, organizationDatastatus: status, organizationServerError: null})
                } else{
                    setOrganizationData({ isFetchingOrganization: false, organizationData: null, organizationDatastatus: status, organizationServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setOrganizationData({ isFetchingOrganization: false, organizationData: null, organizationDatastatus: null, organizationServerError: error})
            }
        }
        fetchOrganizationData()
    }, [query])

    return organizationData
}

//FETCH ALL COURSES
export function fetchAllCourse(query){
    const [ coursesData, setCoursesData ] = useState({ isFetchingData: true, coursesData: null, coursesStatus: null, coursesServerError: null, })
    
    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/course/getAllCourseAdmin`, {withCredentials: true}) : await axios.get(`/course/getACourseAdmin/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCoursesData({ isFetchingData: false, coursesData: data, coursesStatus: status, coursesServerError: null})
                } else{
                    setCoursesData({ isFetchingData: false, coursesData: null, coursesStatus: status, coursesServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setCoursesData({ isFetchingData: false, coursesData: null, coursesStatus: null, coursesServerError: error})
            }
        }
        fetchCoursesData()
    }, [query])

    return coursesData
}