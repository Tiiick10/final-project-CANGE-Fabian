"use client"

import { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Charger les favoris depuis localStorage au démarrage
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(storedFavorites)
  }, [])

  // Sauvegarder les favoris dans localStorage à chaque modification

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Ajouter/Supprimer un livre des favoris

  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === book.id)
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== book.id) // Retirer des favoris
      } else {
        return [...prevFavorites, book] // Ajouter aux favoris
      }
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Accéder aux favoris

export function useFavorites() {
  return useContext(FavoritesContext)
}
