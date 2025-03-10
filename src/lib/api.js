import axios from "axios"

const API_URL = "https://example-data.draftbit.com/books"

export const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error("Erreur lors du chargement des livres :", error)
    throw new Error("Impossible de récupérer les livres.")
  }
}

export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`https://example-data.draftbit.com/books/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors du chargement du livre ${id} :`, error)
    throw new Error("Impossible de récupérer ce livre.")
  }
}
