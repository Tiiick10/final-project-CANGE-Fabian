"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../../lib/api"
import Link from "next/link"
import "../../styles/allBooks.css"

export default function AllBookPage() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState("")

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error.message}</p>

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedAuthor === "" || book.authors.includes(selectedAuthor))
  )

  const uniqueAuthors = [...new Set(books.map((book) => book.authors))]

  return (
    <div>
      <h1>Tous les Livres</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">Tous les auteurs</option>
          {uniqueAuthors.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <Link href={`/book/${book.id}`} className="book-link">
                <img src={book.image_url} alt={book.title} />
                <p>{book.title}</p>
                <p>By : <i>{book.authors}</i></p>
              </Link>
            </div>
          ))
        ) : (
          <p>Aucun livre trouvé.</p>
        )}
      </div>
    </div>
  )
}
