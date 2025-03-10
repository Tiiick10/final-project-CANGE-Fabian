"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../lib/api"; // 📌 Vérifie que le chemin est correct
import Link from "next/link";

export default function AllBookPage() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // 🔍 États pour la recherche et le filtre
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  // 📌 Filtrage des livres en fonction de la recherche et de l'auteur sélectionné
  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedAuthor === "" || book.authors.includes(selectedAuthor))
  );

  // 🔹 Liste unique des auteurs pour le filtre
  const uniqueAuthors = [...new Set(books.map((book) => book.authors))];

  return (
    <div>
      <h1>Tous les Livres</h1>

      {/* 🔍 Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "300px" }}
      />

      {/* 📌 Filtre par auteur */}
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      >
        <option value="">Tous les auteurs</option>
        {uniqueAuthors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>

      {/* 📚 Affichage des livres filtrés */}
      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.slice(0, 10).map((book) => (
            <li key={book.id}>
              <Link href={`/book/${book.id}`}>
                <img src={book.image_url} alt={book.title} width={100} />
                <p>{book.title}</p>
                <p><i>{book.authors}</i></p>
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
