import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Header from "../components/Header"
import KDSItem from "../components/KDSItem"

export default function KDS() {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    let { data } = await supabase.from("orders").select("*")
    setOrders(data)
  }

  useEffect(() => { fetchOrders() }, [])

  return (
    <div>
      <Header title="KDS"/>
      <div className="p-4">
        {orders.map(order => <KDSItem key={order.id} order={order}/>)}
      </div>
    </div>
  )
}
