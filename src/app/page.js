"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../lib/api"
import Link from "next/link"
import "swiper/css"
import "../styles/home.css"
import Loader from "@/components/Loader"
import Carousel from "@/components/Carousel"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"

export default function HomePage() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
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

    <div className="home-container">

      <Carousel />

      {/* Cartes promotions */}

      <div className="promotions">
        <div className="promo-card">
          <img src="img/saleUp/01.jpg" alt="Promo 1" className="promo-image" />
          <div className="promo-text">
            <h3>SALE UP TO 15%</h3>
            <h2>Innovation in Education (Hardcover)</h2>
            <p>
              Starting at: <span className="promo-price">$65.09</span>
            </p>
          </div>
        </div>

        <div className="promo-card">
          <img src="img/saleUp/02.jpg" alt="Promo 2" className="promo-image" />
          <div className="promo-text">
            <h3>SALE UP TO 15%</h3>
            <h2>Innovation in Education (Hardcover)</h2>
            <p>
              Starting at: <span className="promo-price">$65.09</span>
            </p>
          </div>
        </div>
      </div>

      {/* Liste des livres */}

      <h4 className="gridTitle">BOOKS GALLERY</h4>
      <h1 className="gridTitle2">Popular Books</h1>
      <div className="homeBooks-grid">
        {books?.slice(0, visibleBooks).map((book) => (
          <div key={book.id} className="homeBook-card">
            <Link href={`/book/${book.id}`} className="book-link">
              <img
                src={book.image_url}
                alt={book.title}
                width={175}
                height={200}
              />
              <p>{book.title}</p>
              <p>
                By : <i>{book.authors}</i>
              </p>
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

      <Newsletter />

      {/* Footer */}

      <Footer/>

    </div>
  )
}
