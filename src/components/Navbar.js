"use client"

import Link from "next/link"
import "../styles/navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/"><h1>BookShelf</h1></Link>
      <Link href="/allBookPage">Tous les livres</Link>
      <Link href="/favorites">Favoris</Link>
      <Link href="/ranking">Classement</Link>
      <Link href="/login">Connexion</Link>
    </nav>
  )
}
