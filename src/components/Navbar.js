"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { useFavorites } from "../context/FavoritesContext"
import { FaTimes, FaHeart, FaHeartBroken, FaBook, FaPhoneAlt, FaSearch } from "react-icons/fa"
import { CgMenuLeft } from "react-icons/cg";
import "../styles/navbar.css"

export default function Navbar() {
  const { user, isLoading, logout } = useAuth()
  const { favorites, toggleFavorite } = useFavorites()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  const pathname = usePathname() // Détecte la page actuelle

  if (isLoading) return null

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-sidebar") && isMenuOpen) {
        setIsMenuOpen(false)
      }
      if (!event.target.closest(".favorites-sidebar") && isFavoritesOpen) {
        setIsFavoritesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen, isFavoritesOpen])

  return (
    <>
      <nav className="navbar">
        <div className="menuAndLogo">
          <CgMenuLeft className="menu-icon" onClick={() => setIsMenuOpen(true)} />
          <Link href="/" className="logo">
            <h1>BOOKSHELF.</h1>
          </Link>
        </div>

        {/* La barre de recherche reste mais devient invisible sur allBookPage */}
        
        <div className={`search-bar ${ pathname === "/allBookPage" ? "hidden" : "" }`}>
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search your book here" />
        </div>

        {/* Téléphone + Favoris */}

        <div className="right-section">
          <FaPhoneAlt />
          <span>0485313406</span>
          {user && (
            <FaHeart className="fav-icon" onClick={() => setIsFavoritesOpen(true)} />
          )}
        </div>
      </nav>

      {/* Menu latéral gauche */}

      <div className={`menu-sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>BOOKSHELF</h2>
          <FaTimes
            className="close-icon"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <ul className="menu-list">
          <li>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Main page
            </Link>
          </li>
          <li>
            <Link href="/allBookPage" onClick={() => setIsMenuOpen(false)}>
              All books
            </Link>
          </li>
          <li>
            <Link href="/ranking" onClick={() => setIsMenuOpen(false)}>
              Rankings
            </Link>
          </li>
        </ul>

        <div className="menu-auth">
          {user ? (
            <>
              <p className="user-greeting">Bonjour, {user.username}</p>
              <button className="logout-btn" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="login-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
          )}
        </div>
      </div>

      {/* Menu Favoris */}

      <div className={`favorites-sidebar ${isFavoritesOpen ? "open" : ""}`}>
        <FaTimes
          className="close-icon"
          onClick={() => setIsFavoritesOpen(false)}
        />
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          <ul>
            {favorites.map((book) => (
              <li
                key={book.id}
                className="favorite-item"
                onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("hovered")
                }
              >
                <img src={book.image_url} alt={book.title} />
                <div className="favorite-info">
                  <p>{book.title}</p>
                  <div className="favorite-actions">
                    <FaHeartBroken
                      className="noFav-icon"
                      onClick={() => toggleFavorite(book)}
                    />
                    <Link href={`/book/${book.id}`}>
                      <FaBook className="favBook-icon" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
