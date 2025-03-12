"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBookById } from "../../../lib/api"
import { useParams } from "next/navigation"
import "../../../styles/bookDetail.css"
import { useFavorites } from "../../../context/FavoritesContext"
import { FaHeart, FaStar } from "react-icons/fa"
import Loader from "@/components/Loader"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"

export default function BookDetail() {
  
  const { id } = useParams()
  const { favorites, toggleFavorite } = useFavorites()
  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
  })

  const [expanded, setExpanded] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (book && book.id) {
      const storedRating = localStorage.getItem(`rating-${book.id}`)
      if (storedRating) {
        setRating(parseInt(storedRating, 10))
      }
    }
  }, [book])

  const handleRating = (newRating) => {
    setRating(newRating)
    localStorage.setItem(`rating-${book.id}`, newRating)
  }

  const isFavorite = book && book.id ? favorites.some((fav) => fav.id === book.id) : false;

  if (isLoading) return <Loader />
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <>
    <div className="book-container">
    
      <div className="book-image-container">
        <img src={book.image_url} alt={book.title} />
      </div>

      <div className="book-info">
        <button className={`favorite-icon ${isFavorite ? "active" : ""}`} onClick={() => toggleFavorite(book)}>
          <FaHeart />
        </button>
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author"><strong>By : </strong><i>{book.authors}</i></p>

        {/* Description limitée à 3 lignes avec "Voir plus" */}

        <p className={`book-description ${expanded ? "expanded" : ""}`}>
          {book.description}
        </p>

        {/* Notation par étoiles */}

        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`star ${star <= rating ? "active" : ""}`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>

        <div className="book-details">
          <div className="detail-row">
            <p className="detail-title">Édition :</p>
            <p className="detail-value">{book.edition || "Non spécifié"}</p>
          </div>
          <div className="detail-row">
            <p className="detail-title">Format :</p>
            <p className="detail-value">{book.format || "Non spécifié"}</p>
          </div>
          <div className="detail-row">
            <p className="detail-title">Genres :</p>
            <div className="genre-list">
              {book.genres
                ? book.genres.split(",").map((genre, index) => (
                    <span key={index} className="genre-pill">{genre.trim()}</span>
                  ))
                : <span className="detail-value">Non spécifié</span>}
            </div>
          </div>
          <div className="detail-row">
            <p className="detail-title">Number of pages :</p>
            <p className="detail-value">{book.num_pages || "Non spécifié"}</p>
          </div>
          <div className="detail-row">
            <p className="detail-title">Rating :</p>
            <p className="detail-value">{book.rating ? `${book.rating} / 5` : "Non noté"}</p>
          </div>
        </div>
      </div>
    </div>
    <Newsletter />
    <Footer />
    </>
  )
}
