import type { mangadb } from 'wailsjs/go/models'
import { GetAllGenres } from '../../wailsjs/go/main/App'
import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel'
import { useManga } from './app-provider'
export default function GenresCarrousel() {
  const [genres, setGenres] = useState<mangadb.Genre[]>([])
  const { selectedGenre, setSelectedGenre } = useManga()

  useEffect(() => {
    const fetchGenres = async () => {
      const result = await GetAllGenres()
      setGenres([{ genre_name: 'Todos', genre_id: 0 }, ...result])
    }
    fetchGenres()
  }, [])
  return (
    // <Card className="p-2">
      <Carousel
        opts={{
          align: 'center'
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {genres.map((g, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/5 lg:basis-1/10 "
            >
              <Badge
                onClick={() => setSelectedGenre(g)}
                variant={
                  selectedGenre.genre_id === g.genre_id
                    ? 'default'
                    : 'secondary'
                }
                className="w-full px-1 py-1 cursor-pointer"
              >
                {g.genre_name}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    // </Card>
  )
}
