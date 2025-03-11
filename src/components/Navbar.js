"use client"

import Link from "next/link"
import "../styles/navbar.css"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {

  const { user, isLoading, logout } = useAuth()

  if (isLoading) return null

  return (
    <nav className="navbar">
      <Link href="/"><h1>BookShelf</h1></Link>
      <div className="nav-links">
        <Link href="/allBookPage">Tous les livres</Link>
        <Link href="/favorites">Favoris</Link>
        <Link href="/ranking">Classement</Link>
        <div className="auth-section">
          {user ? (
            <>
              <span className="user-greeting">Bonjour, {user.username} </span>
              <button className="logout-button" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
