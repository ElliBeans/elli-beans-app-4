"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: [] as any[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const [recipeRes, invRes] = await Promise.all([
      supabase.from("recipes").select("*").order("name"),
      supabase.from("inventory").select("*").order("name"),
    ]);
    if (recipeRes.error) console.error(recipeRes.error);
    if (invRes.error) console.error(invRes.error);
    else {
      setRecipes(recipeRes.data || []);
      setInventory(invRes.data || []);
    }
    setLoading(false);
  }

  function handleIngredientChange(index: number, field: string, value: string) {
    const updated = [...newRecipe.ingredients];
    updated[index][field] = value;
    setNewRecipe({ ...newRecipe, ingredients: updated });
  }

  function addIngredientRow() {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, { item_id: "", amount: "" }],
    });
  }

  async function addRecipe(e: React.FormEvent) {
    e.preventDefault();
    if (!newRecipe.name) return alert("Please enter a recipe name");
    const { error } = await supabase.from("recipes").insert([
      {
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
      },
    ]);
    if (error) alert(error.message);
    else {
      setNewRecipe({ name: "", ingredients: [] });
      fetchAll();
    }
  }

  async function deleteRecipe(id: number) {
    const confirmDelete = confirm("Delete this recipe?");
    if (!confirmDelete) return;
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    if (error) console.error(error);
    else fetchAll();
  }

  function calculateCOGS(recipe: any) {
    if (!recipe.ingredients || recipe.ingredients.length === 0) return 0;
    return recipe.ingredients.reduce((total: number, ing: any) => {
      const item = inventory.find((i) => i.id === ing.item_id);
      if (!item || !item.cost) return total;
      const amount = parseFloat(ing.amount) || 0;
      const cost = parseFloat(item.cost) || 0;
      return total + cost * amount;
    }, 0);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Products / Recipes</h1>

      <form onSubmit={addRecipe} className="border rounded p-4 mb-6">
        <input
          placeholder="Recipe name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />

        {newRecipe.ingredients.map((ing, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 mb-2">
            <select
              value={ing.item_id}
              onChange={(e) => handleIngredientChange(i, "item_id", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Ingredient</option>
              {inventory.map((item) => (
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

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded ml-2 hover:bg-green-700">
          Save Recipe
        </button>
      </form>

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes yet</p>
      ) : (
        <div className="space-y-4">
          {recipes.map((r) => (
            <div key={r.id} className="border rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{r.name}</h2>
                <button
                  onClick={() => deleteRecipe(r.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>

              <ul className="mb-2">
                {r.ingredient
