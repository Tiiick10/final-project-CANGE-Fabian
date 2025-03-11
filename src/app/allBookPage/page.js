"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../../lib/api"
import "../../styles/allBooksPage.css"
import Link from "next/link"
import { FaThLarge, FaList } from "react-icons/fa"
import Loader from "@/components/Loader"

export default function AllBooksPage() {
  const { data: books, isLoading, error } = useQuery({
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

  // Filtrage des livres selon les critères*

  let filteredBooks = books.filter((book) => {
    const matchesName = book.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || book.genres.includes(selectedCategory)
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
    <div className="all-books-container">
      
      {/* 🔍 Barre latérale des filtres */}

      <aside className="filters-sidebar">
        <input
          type="text"
          placeholder="Search your book here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchBarBooks"
        />

        <h3>Category {selectedCategory}</h3>
        <ul>
          {["All", "Classics", "Fiction", "Historical", "Science Fiction", "Fantasy", "Young Adult"].map((category) => (
            <li key={category} className={selectedCategory === category ? "active" : ""} onClick={() => setSelectedCategory(category)}>
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
        
        {/* Sélecteur de tri par rating */}

        <div className="sort-and-view">
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
            <option value="rating-down">Rating to down</option>
            <option value="rating-up">Rating to up</option>
          </select>

          {/* Changer l'affichage */}

          <div className="view-toggle">
            <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
              <FaThLarge />
            </button>
            <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>
              <FaList />
            </button>
          </div>
        </div>


        {/* Liste des livres */}

        <div className={viewMode === "grid" ? "books-grid" : "books-list"}>
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <Link href={`/book/${book.id}`}>
                <img src={book.image_url} alt={book.title} />
              </Link>
              <div className="book-info">
                <h4>{book.title}</h4>
                <p>By: <i>{book.authors}</i></p>
                {viewMode === "list" && <p className="book-description">{book.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
