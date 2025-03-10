"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../lib/api";
import Link from "next/link";

export default function HomePage() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // Recherche et filtre

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  // Filtre livres en fonction de la recherche et de l'auteur sélectionné

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAuthor === "" || book.authors.includes(selectedAuthor))
  );

  // Auteurs pour le filtre

  const uniqueAuthors = [...new Set(books.map((book) => book.authors))];

  return (
    <div>
      <h1>Bookshelf</h1>

      <Link href="/allBookPage">
        <button
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Voir tous les livres
        </button>
      </Link>

      {/* SearchBar */}

      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "300px" }}
      />

      {/* Livres filtrés */}

      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.slice(0, 10).map((book) => (
            <li key={book.id}>
              <Link href={`/book/${book.id}`}>
                <img src={book.image_url} alt={book.title} width={100} />
                <p>{book.title}</p>
                <p>
                  <i>{book.authors}</i>
                </p>
              </Link>
            </li>
          ))
        ) : (
          <p>Aucun livre trouvé.</p>
        )}
      </ul>
    </div>
  );
}
