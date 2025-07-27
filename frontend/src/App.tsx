// import { useState } from 'react'
// import logo from './assets/images/logo-universal.png'
import { Greet } from '../wailsjs/go/main/App'
import { mangadb } from '../wailsjs/go/models'
// import { Button } from '@/components/ui/button'
import MangaCard from '@/components/manga-card'
import { ThemeProvider } from './components/theme-provider'
import { useEffect, useState } from 'react'

function App() {
  const [manga, setManga] = useState<mangadb.GetAllMangaDetailsRow[]>([])

  useEffect(() => {
    const fetchManga = async () => {
      const result = await Greet()
      setManga(result)
    }
    fetchManga()
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center flex-col min-h-svh w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-7xl mx-auto p-4">
          {manga.map((manga, i) => (
            <MangaCard key={i} manga={manga} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
