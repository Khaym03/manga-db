import { mangadb } from '../../wailsjs/go/models'
import {

  CardTitle
} from './ui/card'
import { Star } from 'lucide-react'
import { Badge } from './ui/badge'

interface MangaCardProps {
  manga: mangadb.GetAllMangaDetailsRow
}

export default function MangaCard({ manga }: MangaCardProps) {
  const imageUrl = manga.cover_image_path.replaceAll('\\', '/')

  return (
    <div className="overflow-hidden">
      <div>
        <img
          src={imageUrl}
          alt={`Cover for ${manga.title}`}
          className="w-full rounded-xl aspect-[1/1.5] object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col gap-2">
          <CardTitle className='pl-2'>{manga.title}</CardTitle>
          {/* <CardDescription>{manga.subtitle}</CardDescription> */}
        </div>
        <div className="flex flex-row justify-between text-muted-foreground h-min text-xs font-semibold">
          <Badge variant={'outline'}>
            <Star size={16} />
            {manga.score}
          </Badge>

          <Badge variant={'secondary'}>{manga.status}</Badge>
          <Badge>{manga.type}</Badge>
        </div>
      </div>
    </div>
  )
}
