"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function InventoryForm({ onSaved }: { onSaved: () => void }) {
  const [form, setForm] = useState({ name: "", par_level: "", quantity: "", cost: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("inventory").insert([
      {
        name: form.name,
        par_level: parseFloat(form.par_level) || 0,
        quantity: parseFloat(form.quantity) || 0,
        cost: parseFloat(form.cost) || 0,
      },
    ]);
    if (error) alert(error.message);
    else {
      setForm({ name: "", par_level: "", quantity: "", cost: "" });
      onSaved();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Add Inventory Item</h3>
      <input
        placeholder="Item name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        placeholder="Par level"
        type="number"
        value={form.par_level}
        onChange={(e) => setForm({ ...form, par_level: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        placeholder="Quantity on hand"
        type="number"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        placeholder="Cost per unit ($)"
        type="number"
        step="0.01"
        value={form.cost}
        onChange={(e) => setForm({ ...form, cost: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
