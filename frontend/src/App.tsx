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
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <div className="grid min-h-svh grid-cols-4 items-center justify-center w-full max-w-7xl mx-auto p-4">
      {manga.map((m, i) => <MangaCard manga={m} key={i}/>)}
    </div>
    </ThemeProvider>
  )
}

export default App
