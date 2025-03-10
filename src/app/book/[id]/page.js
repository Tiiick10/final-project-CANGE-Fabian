"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBookById } from "../../../lib/api"; // 📌 Vérifie bien le chemin d'import
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BookDetail() {
  const { id } = useParams(); // 📌 Récupère l'ID du livre dans l'URL

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id], // ✅ Clé unique pour chaque livre
    queryFn: () => fetchBookById(id),
    enabled: !!id, // ✅ Ne lance la requête que si l'ID existe
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.image_url} alt={book.title} width={200} />
      <p><strong>Auteur :</strong> {book.authors}</p>
      <p><strong>Description :</strong> {book.description}</p>

      {/* 🔙 Lien pour revenir à la page précédente */}
      <Link href="/allBookPage">
        <button style={{ padding: "10px", marginTop: "20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Retour aux livres
        </button>
      </Link>
    </div>
  );
}
