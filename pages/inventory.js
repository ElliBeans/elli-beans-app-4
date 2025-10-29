import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", par: "", cost: "" });
  const [loading, setLoading] = useState(true);

  // Fetch all inventory items
  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    setLoading(true);
    const { data, error } = await supabase.from("inventory").select("*");
    if (error) console.error("Error fetching inventory:", error);
    else setItems(data);
    setLoading(false);
  }

  async function addItem(e) {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity || !newItem.par || !newItem.cost) return;

    const { error } = await supabase.from("inventory").insert([newItem]);
    if (error) console.error("Error adding item:", error);
    else {
      setNewItem({ name: "", quantity: "", par: "", cost: "" });
      fetchInventory();
    }
  }

  async function updateQuantity(id, newQty) {
    const { error } = await supabase.from("inventory").update({ quantity: newQty }).eq("id", id);
    if (error) console.error("Error updating quantity:", error);
    fetchInventory();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-amber-600 mb-6 text-center">Inventory</h1>

        <form onSubmit={addItem} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="number"

        ))}
      </div>
    </div>
  )
}
