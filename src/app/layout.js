"use client"

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FavoritesProvider } from "../context/FavoritesContext"
import { useState } from "react"
import Navbar from "../components/Navbar"
import { AuthProvider } from "../context/AuthContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="fr">
      <head>
        <title>Bookshelf - Votre Librairie</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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

