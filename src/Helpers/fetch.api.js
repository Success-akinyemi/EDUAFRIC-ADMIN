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

//FETCH ALL ORDERS
export function fetchAllOrders(query){
    const [ oderData, setOrderData ] = useState({ isFetchingOrders: true, oderData: null, orderDataStatus: null, orderDataServerError: null, })
    
    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/orders/fetchAllOrders`, {withCredentials: true}) : await axios.get(`/orders/fetchOrder/${query}`, {withCredentials: true})
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

//FETCH SITE SETTINGS
export function fetchSiteSettings(query){
    const [ siteSetting, setSiteSettings ] = useState({ isFetchingData: true, siteSettingsData: null, siteSettingStatus: null, siteSettingServerError: null, })
    
    useEffect(() => {
        const fetchSiteSettingsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/admin/getSiteSettings`, {withCredentials: true}) : await axios.get(`/admin/getSiteSettings/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setSiteSettings({ isFetchingData: false, siteSettingsData: data, siteSettingStatus: status, siteSettingServerError: null})
                } else{
                    setSiteSettings({ isFetchingData: false, siteSettingsData: null, siteSettingStatus: status, siteSettingServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setSiteSettings({ isFetchingData: false, siteSettingsData: null, siteSettingStatus: null, siteSettingServerError: error})
            }
        }
        fetchSiteSettingsData()
    }, [query])

    return siteSetting
}

//FETCH COUNTRIES
export function fetchCountries(query){
    const [ countriesData, setCountriesData ] = useState({ isFetchingData: true, countriesData: null, countriesStatus: null, countriesServerError: null, })
    
    useEffect(() => {
        const fectchCountriesData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/country/getCountries`, {withCredentials: true}) : await axios.get(`/country/getCountry/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCountriesData({ isFetchingData: false, countriesData: data, countriesStatus: status, countriesServerError: null})
                } else{
                    setCountriesData({ isFetchingData: false, countriesData: null, countriesStatus: status, countriesServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setCountriesData({ isFetchingData: false, countriesData: null, countriesStatus: null, countriesServerError: error})
            }
        }
        fectchCountriesData()
    }, [query])

    return countriesData
}

//FETCH STAFFS
export function fetchStaffs(query){
    const [ staffsData, setStaffsData ] = useState({ isFetchingStaffsData: true, staffsData: null, staffsStatus: null, staffsError: null, })
    
    useEffect(() => {
        const fetchStaffsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/admin/getAllAdmin`, {withCredentials: true}) : await axios.get(`/admin/getAdmin/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setStaffsData({ isFetchingStaffsData: false, staffsData: data, staffsStatus: status, staffsError: null})
                } else{
                    setStaffsData({ isFetchingStaffsData: false, staffsData: null, staffsStatus: status, staffsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setStaffsData({ isFetchingStaffsData: false, staffsData: null, staffsStatus: null, staffsError: error})
            }
        }
        fetchStaffsData()
    }, [query])

    return staffsData
}

//FETCH STAFFS
export function fetchCms(query){
    const [ cmsData, setCmsData ] = useState({ isFetchingCmsData: true, cmsData: null, cmsStatus: null, cmsError: null, })
    
    useEffect(() => {
        const fetchCmsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/cms/getAllCms`, {withCredentials: true}) : await axios.get(`/cms/getCms/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCmsData({ isFetchingCmsData: false, cmsData: data, cmsStatus: status, cmsError: null})
                } else{
                    setCmsData({ isFetchingCmsData: false, cmsData: null, cmsStatus: status, cmsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setCmsData({ isFetchingCmsData: false, cmsData: null, cmsStatus: null, cmsError: error})
            }
        }
        fetchCmsData()
    }, [query])

    return cmsData
}

//FETCH STUDENT STATS
export function fetchStudentStats(query){
    const [ studentStats, setStudentStats ] = useState({ isFetching: true, statsData: null, statsStatus: null, statsError: null, })
    
    useEffect(() => {
        const fetchStudentStats = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/student/getStudentStats/${query}`, {withCredentials: true}) : await axios.get(`/student/getStudentStats/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setStudentStats({ isFetching: false, statsData: data, statsStatus: status, statsError: null})
                } else{
                    setStudentStats({ isFetching: false, statsData: null, statsStatus: status, statsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setStudentStats({ isFetching: false, statsData: null, statsStatus: null, statsError: error})
            }
        }
        fetchStudentStats()
    }, [query])

    return studentStats
}

//FETCH INSTRUCTOR STATS
export function fetchInstructorStats(query){
    const [ instructorStats, setInstructorStats ] = useState({ isFetching: true, statsData: null, statsStatus: null, statsError: null, })
    
    useEffect(() => {
        const fetchInstructorStats = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/instructor/getInstructorStats/${query}`, {withCredentials: true}) : await axios.get(`/instructor/getInstructorStats/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setInstructorStats({ isFetching: false, statsData: data, statsStatus: status, statsError: null})
                } else{
                    setInstructorStats({ isFetching: false, statsData: null, statsStatus: status, statsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setInstructorStats({ isFetching: false, statsData: null, statsStatus: null, statsError: error})
            }
        }
        fetchInstructorStats()
    }, [query])

    return instructorStats
}

//FETCH ORGANIZATION STATS
export function fetchOrganizationStats(query){
    const [ organizationStats, setOrganizationStats ] = useState({ isFetching: true, statsData: null, statsStatus: null, statsError: null, })
    
    useEffect(() => {
        const fetchOrganizationStats = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/organization/getOrganizationStats/${query}`, {withCredentials: true}) : await axios.get(`/organization/getOrganizationStats/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setOrganizationStats({ isFetching: false, statsData: data, statsStatus: status, statsError: null})
                } else{
                    setOrganizationStats({ isFetching: false, statsData: null, statsStatus: status, statsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setOrganizationStats({ isFetching: false, statsData: null, statsStatus: null, statsError: error})
            }
        }
        fetchOrganizationStats()
    }, [query])

    return organizationStats
}

//FETCH ORDER STATS
export function fetchOrdersStats(query){
    const [ studentStats, setStudentStats ] = useState({ isFetching: true, statsData: null, statsStatus: null, statsError: null, })
    
    useEffect(() => {
        const fetchStudentStats = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/orders/getOrderStats/${query}`, {withCredentials: true}) : await axios.get(`/orders/getOrderStats/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setStudentStats({ isFetching: false, statsData: data, statsStatus: status, statsError: null})
                } else{
                    setStudentStats({ isFetching: false, statsData: null, statsStatus: status, statsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setStudentStats({ isFetching: false, statsData: null, statsStatus: null, statsError: error})
            }
        }
        fetchStudentStats()
    }, [query])

    return studentStats
}

//FETCH ORGANIZATION STATS
export function fetchCourseStats(query){
    const [ courseStats, setCourseStats ] = useState({ isFetching: true, statsData: null, statsStatus: null, statsError: null, })
    
    useEffect(() => {
        const fetchCourseStats = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/course/getCourseStats/${query}`, {withCredentials: true}) : await axios.get(`/course/getCourseStats/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCourseStats({ isFetching: false, statsData: data, statsStatus: status, statsError: null})
                } else{
                    setCourseStats({ isFetching: false, statsData: null, statsStatus: status, statsError: null})
                }
            } catch (error) {
                console.log('object', error)
                setCourseStats({ isFetching: false, statsData: null, statsStatus: null, statsError: error})
            }
        }
        fetchCourseStats()
    }, [query])

    return courseStats
}

//FETCH COUPON CODE
export function fetchCouponCodes(query){
    const [ couponCodeData, setCouponCodeData ] = useState({ isFetchingCoupon: true, couponCodeData: null, couponCodeStatus: null, couponCodeError: null, })
    const { all, id } = query
    useEffect(() => {
        const fetchCouponCode = async () => {
            try {
                const { data, status} = all ? await axios.get(`/coupon/getCoupons/${id}`, {withCredentials: true}) : await axios.get(`/coupon/getCouponCode/${id}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setCouponCodeData({ isFetchingCoupon: false, couponCodeData: data, couponCodeStatus: status, couponCodeError: null})
                } else{
                    setCouponCodeData({ isFetchingCoupon: false, couponCodeData: null, couponCodeStatus: status, couponCodeError: null})
                }
            } catch (error) {
                console.log('coupon error', error)
                setCouponCodeData({ isFetchingCoupon: false, couponCodeData: null, couponCodeStatus: null, couponCodeError: error})
            }
        }
        fetchCouponCode()
    }, [all, id])

    return couponCodeData
}

//FETCH ALL ADVERT - both banner ads and recomendation ads
export function fetchAllAdvert(query){
    const { value, id } = query
    const [ advertData, setAdvertData ] = useState({ isFetchingAdvert: true, advertData: null, advertDataStatus: null, advertDataServerError: null, })
    
    useEffect(() => {
        const fetchAdvertData = async () => {
            try {
                const { data, status} = value ? await axios.get(`/advert/fetchAllAdvert/${value}`, {withCredentials: true}) : await axios.get(`/advert/fetchAdvert/${id}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setAdvertData({ isFetchingAdvert: false, advertData: data, advertDataStatus: status, advertDataServerError: null})
                } else{
                    setAdvertData({ isFetchingAdvert: false, advertData: null, advertDataStatus: status, advertDataServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setAdvertData({ isFetchingAdvert: false, advertData: null, advertDataStatus: null, advertDataServerError: error})
            }
        }
        fetchAdvertData()
    }, [value, id])

    return advertData
}

//FETCH TOP SELLING COURSE
export function fetchTopSellingCourse(query){
    const [ topSellingCourseData, setTopSellingCourseData ] = useState({ isFetchingCourseContent: true, courseData: null, courseDataStatus: null, courseDataServerError: null, })
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const { data, status} = query ? await axios.get(`/orders/topSellingCourse/${query}`, {withCredentials: true}) : await axios.get(`/orders/topSellingCourse/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTopSellingCourseData({ isFetchingCourseContent: false, courseData: data, courseDataStatus: status, courseDataServerError: null})
                } else{
                    setTopSellingCourseData({ isFetchingCourseContent: false, courseData: null, courseDataStatus: status, courseDataServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setTopSellingCourseData({ isFetchingCourseContent: false, courseData: null, courseDataStatus: null, courseDataServerError: error})
            }
        }
        fetchCourseData()
    }, [query])

    return topSellingCourseData
}

//FETCH DASHBOARD STATS
export function fetchDashboardStats(query){
    const [ dashboardStats, setDashboardStats ] = useState({ isFetchingStats: true, statsData: null, statsDataStatus: null, statsDataServerError: null, })
    console.log('QUERY', query)
    useEffect(() => {
        const fetchDashboardStatsData = async () => {
            try {
                const { data, status} = query ? await axios.get(`/dashboard/dashboardStats/${query}`, {withCredentials: true}) : await axios.get(`/dashboard/dashboardStats/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setDashboardStats({ isFetchingStats: false, statsData: data, statsDataStatus: status, statsDataServerError: null})
                } else{
                    setDashboardStats({ isFetchingStats: false, statsData: null, statsDataStatus: status, statsDataServerError: null})
                }
            } catch (error) {
                console.log('object', error)
                setDashboardStats({ isFetchingStats: false, statsData: null, statsDataStatus: null, statsDataServerError: error})
            }
        }
        fetchDashboardStatsData()
    }, [query])

    return dashboardStats
}