"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", backgroundColor: "#333", color: "white", display: "flex", gap: "15px" }}>
      <Link href="/" style={{ color: "white", textDecoration: "none" }}>Accueil</Link>
      <Link href="/allBookPage" style={{ color: "white", textDecoration: "none" }}>Tous les livres</Link>
      <Link href="/favorites" style={{ color: "white", textDecoration: "none" }}>Favoris</Link>
      <Link href="/ranking" style={{ color: "white", textDecoration: "none" }}>Classement</Link>
      <Link href="/login" style={{ color: "white", textDecoration: "none" }}>Connexion</Link>
    </nav>
  )
}
