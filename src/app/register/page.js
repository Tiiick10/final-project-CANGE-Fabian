"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import "../../styles/auth.css"

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()
    const result = register(username, password)
    if (result.success) {
      setSuccess("Compte créé avec succès ! Redirection vers la connexion...")
      setTimeout(() => router.push("/login"), 2000)
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-container">
      <h1>Inscription</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Créer un compte</button>
      </form>
      <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
    </div>
  )
}
