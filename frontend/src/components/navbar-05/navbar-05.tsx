import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Logo } from "./logo";
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SearchByTitle, GetAllMangas } from "../../../wailsjs/go/main/App";
import { useManga } from '../app-provider'

const Navbar05Page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const {setManga} = useManga()

  useEffect(()=> {
    const searchMangas = async () => {
      if (searchQuery.length === 0) {
        setManga(await GetAllMangas())
        return
      }

      const mangas = await SearchByTitle(searchQuery)
      setManga(mangas?? [])
    }
    searchMangas()
    
  },[searchQuery])

  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
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
              className="pl-10 flex-1 bg-slate-100/70 dark:bg-slate-800 border-none shadow-none w-full rounded-full"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
          >
            <Search className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full"
          >
            Sign In
          </Button>
          <Button className="rounded-full">Get Started</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar05Page
