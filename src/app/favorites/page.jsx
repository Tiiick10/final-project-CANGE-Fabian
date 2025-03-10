"use client"

import Link from "next/link"
import { useFavorites } from "../../context/FavoritesContext"
import "../../styles/favorites.css"

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="favorites-container">
      <h1>Mes Livres Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun livre en favori pour le moment.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((book) => (
            <div key={book.id} className="favorite-card">
              <Link href={`/book/${book.id}`} className="favorite-link">
                <img src={book.image_url} alt={book.title} />
                <p>{book.title}</p>
              </Link>
              <button onClick={() => toggleFavorite(book)} className="remove-favorite">
                Retirer ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
