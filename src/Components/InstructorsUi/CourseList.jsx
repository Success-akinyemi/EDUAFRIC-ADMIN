import { fetchInstructorsCourses } from "../../Helpers/fetch.api"
import CourseTable from "./CourseTable"
import { useState } from "react"

function CourseList({ id }) {
    const { isFetchingInstructorsData, instructorsCourseData } = fetchInstructorsCourses({ allCourse: true, id: id})
    const dataArray = instructorsCourseData?.data
    const [ timeDate, setTimeDate ] = useState()
  return (
    <div className="card">
      <CourseTable data={dataArray} loading={isFetchingInstructorsData} timeDate={timeDate} setTimeDate={setTimeDate} />
    </div>
  )
}

export default CourseList
