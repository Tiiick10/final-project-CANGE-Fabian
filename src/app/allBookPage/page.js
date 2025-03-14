"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../../lib/api"
import "../../styles/allBooksPage.css"
import Link from "next/link"
import { FaHeart, FaBook, FaStar, FaThLarge, FaList } from "react-icons/fa"
import { useFavorites } from "../../context/FavoritesContext"
import Loader from "@/components/Loader"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"

export default function AllBooksPage() {

  const { favorites, toggleFavorite } = useFavorites()
  

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState("grid")
  const [sortOrder, setSortOrder] = useState("rating-up")

  if (isLoading) return <Loader />
  if (error) return <p>Erreur : {error.message}</p>

  // Filtrage des livres

  let filteredBooks = books.filter((book) => {
    const matchesName = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || book.genres.includes(selectedCategory)
    const matchesRating = book.rating >= minRating
    return matchesName && matchesCategory && matchesRating
  })

  // Tri des livres selon le rating

  filteredBooks.sort((a, b) => {
    if (sortOrder === "rating-up") return a.rating - b.rating
    if (sortOrder === "rating-down") return b.rating - a.rating
    return 0
  })

  return (
    <>
    <div
      className={`all-books-container ${
        viewMode === "list" ? "detail-view" : "grid-view"
      }`}
      >

      {/* Barre latérale des filtres */}

      <aside className="filters-sidebar">
        <input
          type="text"
          placeholder="Search your book here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchBarBooks"
        />

        <h3>Category {selectedCategory} </h3>
        <ul>
          {[
            "All",
            "Classics",
            "Fiction",
            "Historical",
            "Science Fiction",
            "Fantasy",
            "Young Adult",
          ].map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <h3>Minimum rating</h3>
        <div className="rating-slider-container">
          <span className="rating-value">{minRating.toFixed(1)} / 5</span>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="custom-slider"
          />
        </div>
      </aside>

      {/* Contenu principal */}

      <div className="books-content">

        {/* Sélecteur de tri + boutons de disposition */}

        <div className="sort-and-view">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="rating-down">Rating to down</option>
            <option value="rating-up">Rating to up</option>
          </select>

          {/* Boutons de disposition */}

          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              <FaThLarge />
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Liste des livres */}

        {viewMode === "grid" ? (
          <div className="books-grid">
            {filteredBooks.map((book) => {
              const isFavorite = favorites.some((fav) => fav.id === book.id)

              return (
                <div key={book.id} className="book-card">
                  <Link href={`/book/${book.id}`}>
                    <img
                      src={book.image_url}
                      alt={book.title}
                      className="bookImg"
                    />
                  </Link>

                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <p>
                      By: <i>{book.authors}</i>
                    </p>
                  </div>

                  {/* Boutons favoris et détails */}

                  <div className="book-actions">
                    <FaHeart
                      className={`heart-icon ${
                        isFavorite ? "favorite-active" : ""
                      }`}
                      onClick={() => toggleFavorite(book)}
                    />
                    <Link href={`/book/${book.id}`}>
                      <FaBook className="book-icon" />
                    </Link>
                  </div>

                  {/* Overlay affichant le rating et le nombre d'avis */}

                  <div className="book-overlay">
                    <span className="book-rating">
                      <FaStar color="#FFD700" /> {book.rating.toFixed(2)} / 5
                    </span>
                    <span className="book-reviews">
                      {" "}
                      On {book.rating_count} advises
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="books-list">
            {filteredBooks.map((book) => {
              const isFavorite = favorites.some((fav) => fav.id === book.id)

              return (

                <div key={book.id} className="list-view">

                  {/* Image + Favoris / détails */}

                  <div className="list-left">

                    <img src={book.image_url} alt={book.title} />

                    {/* Rating en haut de l'image */}

                    <span className="book-rating">
                      {book.rating.toFixed(2)} / 5 <FaStar color="black" /> 
                    </span>

                    {/* Boutons Favoris et Détail */}

                    <div className="book-actions-list">
                      <FaBook
                        className="action-icon-book"
                        onClick={() =>
                          (window.location.href = `/book/${book.id}`)
                        }
                      />
                      <FaHeart
                        className={`action-icon-fav ${
                          isFavorite ? "favorite-active" : ""
                        }`}
                        onClick={() => toggleFavorite(book)}
                      />
                    </div>
                  </div>

                  {/* Description / Auteur */}
                  
                  <div className="list-right">
                    <h4>{book.title}</h4>
                    <p>
                      By: <i>{book.authors}</i>
                    </p>
                    <p className="book-description-list">{book.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
    <Newsletter />
    <Footer />
    </>
  )
}
