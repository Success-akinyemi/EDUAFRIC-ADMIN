import { useState } from "react"
import OrderTable from "./OrderTable"
import { fetchAllOrders } from "../../Helpers/fetch.api"

function OrderList() {
    const { isFetchingOrders, oderData } = fetchAllOrders()
    const dataArray = oderData?.data
    const [ timeDate, setTimeDate ] = useState()
  return (
    <div className="card">
      <OrderTable data={dataArray} loading={isFetchingOrders} timeDate={timeDate} setTimeDate={setTimeDate} />
    </div>
  )
}

export default OrderList
