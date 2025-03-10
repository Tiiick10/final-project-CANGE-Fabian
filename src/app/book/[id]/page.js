"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBookById } from "../../../lib/api"
import { useParams } from "next/navigation"
import "../../../styles/bookDetail.css"

export default function BookDetail() {
  const { id } = useParams()
  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
  })

  const [expanded, setExpanded] = useState(false)

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <div className="book-container">
    
      <div className="book-image-container">
        <img src={book.image_url} alt={book.title} />
      </div>

      <div className="book-info">
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author"><strong>By : </strong><i>{book.authors}</i></p>

        {/* Description limitée à 3 lignes avec "Voir plus" */}

        <p className={`book-description ${expanded ? "expanded" : ""}`}>
          {book.description}
        </p>
        {/* <button className="expand-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Voir moins" : "Voir plus"}
        </button> */}

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
  )
}
