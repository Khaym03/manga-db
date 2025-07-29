import type { mangadb } from 'wailsjs/go/models'
import { GetAllGenres } from '../../wailsjs/go/main/App'
import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel'
export default function GenresCarrousel() {
  const [genres, setGenres] = useState<mangadb.Genre[]>([])
  useEffect(() => {
    const fetchGenres = async () => {
      const result = await GetAllGenres()
      setGenres(result)
    }
    fetchGenres()
  }, [])
  return (
    <Card className='p-2'>
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-full"
      >
        <CarouselContent className='-ml-1'>
          {genres.map((g, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/10">
              <Badge className='w-full px-1 py-1'>{g.genre_name}</Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  )
}
