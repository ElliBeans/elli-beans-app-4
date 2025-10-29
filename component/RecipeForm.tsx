"use client";
import { useState } from "react";

export default function RecipeForm({ inventory, onSubmit }: any) {
  const [form, setForm] = useState({ name: "", ingredients: [] as any[] });

  function handleIngredientChange(index: number, field: string, value: string) {
    const updated = [...form.ingredients];
    updated[index][field] = value;
    setForm({ ...form, ingredients: updated });
  }

  function addIngredientRow() {
    setForm({ ...form, ingredients: [...form.ingredients, { item_id: "", amount: "" }] });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", ingredients: [] });
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Add Recipe</h3>
      <input
        placeholder="Recipe name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />

      {form.ingredients.map((ing, i) => (
        <div key={i} className="grid grid-cols-2 gap-2 mb-2">
          <select
            value={ing.item_id}
            onChange={(e) => handleIngredientChange(i, "item_id", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Ingredient</option>
            {inventory.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Amount (e.g. 0.5)"
            value={ing.amount}
            onChange={(e) => handleIngredientChange(i, "amount", e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addIngredientRow}
        className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded mb-2"
      >
        + Add Ingredient
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Recipe
      </button>
    </form>
  );
}
