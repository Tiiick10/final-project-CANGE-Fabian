"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../lib/api" 
import Link from "next/link"
import "swiper/css"
import "../styles/home.css"
import Loader from "@/components/Loader"
import Carousel from "@/components/Carousel"

export default function HomePage() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  })

  const [visibleBooks, setVisibleBooks] = useState(5)

  const loadMoreBooks = () => {
    setVisibleBooks((prev) => prev + 5)
  }

  if (isLoading) return <Loader />
  if (error) return <p>Erreur : {error.message}</p>

  return (

    <div>
      
      <Carousel />

      {/* Cartes promotions */}

      <div className="promotions">
        <div className="promo-card promo1">
          <h2>Promo Spéciale 1</h2>
          <p>Découvrez les meilleures offres de la semaine.</p>
        </div>
        <div className="promo-card promo2">
          <h2>Promo Spéciale 2</h2>
          <p>Offre limitée sur les nouveaux titres !</p>
        </div>
      </div>

      {/* Liste des livres */}
      
      <h4 className="gridTitle">BOOKS GALLERY</h4>
      <h1 className="gridTitle2">Popular Books</h1>
      <div className="books-grid">
        {books?.slice(0, visibleBooks).map((book) => (
          <div key={book.id} className="book-card">
            <Link href={`/book/${book.id}`} className="book-link">
              <img src={book.image_url} alt={book.title} width={175} height={200} />
              <p>{book.title}</p>
              <p>By : <i>{book.authors}</i></p>
            </Link>
          </div>
        ))}
      </div>

      {/* Load More */}

      {visibleBooks < books.length && (
        <div className="load-more">
          <button onClick={loadMoreBooks}>Charger plus</button>
        </div>
      )}

      {/* Join Our Community */}

      <div className="newsletter">
        <h2>Rejoignez notre communauté</h2>
        <p>Inscrivez-vous pour recevoir les dernières nouveautés et promotions.</p>
        <input type="email" placeholder="Votre email" />
        <button>S'inscrire</button>
      </div>

      {/* Footer */}

      <footer className="footer">
        <p> © 2025 Bookshelf - Tous droits réservés.</p>
      </footer>
    </div>
  )
}
