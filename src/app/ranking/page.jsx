"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../../lib/api"
import Link from "next/link"
import "../../styles/ranking.css"
import { FaStar } from "react-icons/fa"
import Loader from "@/components/Loader"

export default function RankingPage() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })

  const [rankedBooks, setRankedBooks] = useState([])

  useEffect(() => {
    if (books) {

      // Récupérer les notes des livres depuis localStorage et les trier

      const booksWithRatings = books.map((book) => {
        const storedRating = localStorage.getItem(`rating-${book.id}`)
        return { ...book, userRating: storedRating ? parseInt(storedRating, 10) : 0 }
      })

      // Trier les livres du plus haut au plus bas

      const sortedBooks = booksWithRatings.sort((a, b) => b.userRating - a.userRating)
      setRankedBooks(sortedBooks)
    }
  }, [books])

  if (isLoading) return <Loader />
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <div className="ranking-container">
      <h1>Classement des livres</h1>
      {rankedBooks.length === 0 ? (
        <p>Aucun livre classé pour l'instant.</p>
      ) : (
        <div className="ranking-grid">
          {rankedBooks.map((book, index) => (
            <div key={book.id} className="ranking-card">
              <span className="rank-number">#{index + 1}</span>
              <Link href={`/book/${book.id}`} className="ranking-link">
                <img src={book.image_url} alt={book.title} />
                <p className="book-title">{book.title}</p>
              </Link>
              <div className="rating-display">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className={`star ${star <= book.userRating ? "active" : ""}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
