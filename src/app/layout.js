"use client"

import "./globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FavoritesProvider } from "../context/FavoritesContext"
import { useState } from "react"
import Navbar from "../components/Navbar"
import { AuthProvider } from "../context/AuthContext"

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="fr">
      <head>
        <title>Bookshelf - Votre Librairie</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FavoritesProvider>
              <Navbar />
              <main>{children}</main>
            </FavoritesProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

