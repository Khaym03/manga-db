// import { useState } from 'react'
// import logo from './assets/images/logo-universal.png'
// import { Greet } from '../wailsjs/go/main/App'
// import { mangadb } from '../wailsjs/go/models'
// import { Button } from '@/components/ui/button'
import MangaCard from '@/components/manga-card'
import { ThemeProvider } from './components/theme-provider'
// import { useEffect, useState } from 'react'
import Navbar05Page from './components/navbar-05/navbar-05'
import AppProvider, { useManga } from './components/app-provider'
import MangaDetailSheet from './components/manga-details'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <div className="flex items-center flex-col min-h-svh w-full scroll-smooth">
          <Navbar05Page />
          <div className="mt-36">
            <CollectionsDisplay />
          </div>
          <MangaDetailSheet />
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App

function CollectionsDisplay() {
  const { manga } = useManga()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-7xl mx-auto p-4">
      {manga.map((manga, i) => (
        <MangaCard key={i} manga={manga} />
      ))}
    </div>
  )
}
