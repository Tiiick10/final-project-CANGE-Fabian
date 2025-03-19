"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import "../../styles/auth.css"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const result = login(username, password)
    if (result.success) {
      router.push("/")
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-page">
      <img src="/img/heroBanner/books-1842306_1920.jpg" className="authImg" />
      <div className="auth-container">
        <h1>Connexion</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
        <p>
          Pas encore de compte ? <a href="/register">S&apos;inscrire</a>
        </p>
      </div>
    </div>
  )
}
