import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Header from "../components/Header"
import InventoryForm from "../components/InventoryForm"

export default function Inventory() {
  const [inventory, setInventory] = useState([])

  const fetchInventory = async () => {
    let { data } = await supabase.from("inventory").select("*")
    setInventory(data)
  }

  useEffect(() => { fetchInventory() }, [])

  return (
    <div>
      <Header title="Inventory"/>
      <InventoryForm fetchInventory={fetchInventory}/>
      <div className="p-4">
        {inventory.map(item => (
          <div key={item.id} className="border-b py-1">
            {item.name} — Qty: {item.quantity} — Par: {item.par_level} — Cost: ${item.cost}
          </div>
        ))}
      </div>
    </div>
  )
}
