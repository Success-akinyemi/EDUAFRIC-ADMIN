import { useState } from "react"
import OrderTable from "./OrderTable"
import { fetchStudentAllOrders } from "../../Helpers/fetch.api"

function OrderList({ id }) {
    const { isFetchingOrders, oderData } = fetchStudentAllOrders(id)
    const dataArray = oderData?.data
    const [ timeDate, setTimeDate ] = useState()
  return (
    <div className="card">
      <OrderTable data={dataArray} loading={isFetchingOrders} timeDate={timeDate} setTimeDate={setTimeDate} />
    </div>
  )
}

export default OrderList
