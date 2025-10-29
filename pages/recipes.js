import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Header from "../components/Header"
import RecipeForm from "../components/RecipeForm"

export default function Recipes() {
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    let { data } = await supabase.from("recipes").select("*")
    setRecipes(data)
  }

  useEffect(() => { fetchRecipes() }, [])

  return (
    <div>
      <Header title="Recipes"/>
      <RecipeForm fetchRecipes={fetchRecipes}/>
      <div className="p-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="border-b py-1">
            {recipe.name} — Ingredients: {recipe.ingredients} — Price: ${recipe.price}
          </div>
        ))}
      </div>
    </div>
  )
}
