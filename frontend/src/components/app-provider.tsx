import React, { useState, useEffect, createContext, useContext } from 'react'
import { mangadb, model } from '../../wailsjs/go/models'
import { GetAllMangas } from '../../wailsjs/go/main/App'

interface MangaContextType {
  manga: model.Manga[]
  isLoading: boolean
  setManga: React.Dispatch<React.SetStateAction<model.Manga[]>>
  selectedGenre: mangadb.GetMangaGenresByMangaIDRow
  setSelectedGenre: React.Dispatch<
    React.SetStateAction<mangadb.GetMangaGenresByMangaIDRow>
  >
  error: string | null

   selectedManga: model.Manga | null;
  setSelectedManga: React.Dispatch<React.SetStateAction<model.Manga | null>>;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined)

export const useManga = () => {
  const context = useContext(MangaContext)
  if (context === undefined) {
    throw new Error('useManga must be used within a MangaProvider')
  }
  return context
}

export default function MangaProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [manga, setManga] = useState<model.Manga[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedGenre, setSelectedGenre] =
    useState<mangadb.GetMangaGenresByMangaIDRow>({
      genre_name: 'todo',
      genre_id: 0
    })

    const [selectedManga, setSelectedManga] = useState<model.Manga | null>(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const result = await GetAllMangas()
        console.log(result)
        setManga(result)
      } catch (err) {
        console.error('Error fetching manga:', err)
        setError('Failed to load manga data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchManga()
  }, [])

  useEffect(() => {
    const update = async () => {
      const mangas = await GetAllMangas()
      if (selectedGenre.genre_id === 0) {
        setManga(mangas)
        return
      }
      const mangasWithGenre = mangas.filter(m =>
        m.genres.some(g => g.genre_id === selectedGenre.genre_id)
      )
      setManga(mangasWithGenre)
    }

    update()
  }, [selectedGenre])

  const contextValue: MangaContextType = {
    manga,
    setManga,
    isLoading,
    error,
    selectedGenre,
    setSelectedGenre,
    selectedManga,
    setSelectedManga
  }

  return (
    <MangaContext.Provider value={contextValue}>
      {children}
    </MangaContext.Provider>
  )
}
