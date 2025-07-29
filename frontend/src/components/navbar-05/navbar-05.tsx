import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Logo } from "./logo";
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SearchByTitle } from '../../../wailsjs/go/main/App'
import { useManga } from '../app-provider'
// import type { model } from 'wailsjs/go/models'
import GenresCarrousel from '../genres-carrousel'

const Navbar05Page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { setSelectedGenre, setManga, manga } = useManga()

  useEffect(() => {
    const searchMangas = async () => {
      if (searchQuery.length === 0) {
        setSelectedGenre({ genre_name: 'Todos', genre_id: 0 })
        return
      }

      const mangas = (await SearchByTitle(searchQuery)) 
      setManga(mangas ?? [])
    }
    searchMangas()
  }, [searchQuery])

  return (
    <div className='bg-black/40 w-full h-40 fixed top-0 inset-x-4 backdrop-blur-sm max-w-screen-xl mx-auto z-50'>
      <div className='absolute top-6 bg-background w-full h-28'>
        <nav className="fixed top-6 inset-x-4 h-16  max-w-screen-xl mx-auto">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6">
            {/* <Logo className="shrink-0" /> */}

            <div className="relative hidden md:block">
              <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
              <Input
                value={searchQuery}
                onChange={e => {
                  console.log(searchQuery)
                  setSearchQuery(e.target.value)
                }}
                className="pl-10 flex-1 bg-slate-100/70 dark:bg-slate-800 border-none shadow-none w-[600px] rounded-full"
                placeholder="Buscar..."
              />
               <div className='absolute inset-y-0 my-auto right-2.5 p-2 text-secondary-foreground/80 font-medium text-sm'>Resultados({manga.length})</div>
            </div>
          </div>

         

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
            >
              <Search className="!h-5 !w-5" />
            </Button>
            {/* <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
            >
              agregar
            </Button> */}
            <Button className="rounded-full">Nuevo</Button>
          </div>
        </div>
        <GenresCarrousel />
      </nav>
      </div>
    </div>
  )
}

export default Navbar05Page
