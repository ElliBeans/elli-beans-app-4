import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Login() {
  const [email, setEmail] = useState("")

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email })
    alert("Check your email for login link!")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Elli Beans Dashboard Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2"/>
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Send Magic Link</button>
    </div>
  )
}
