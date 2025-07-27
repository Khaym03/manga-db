// import React, { useEffect, useState } from 'react';
import { mangadb } from '../../wailsjs/go/models';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';

interface MangaCardProps {
  manga: mangadb.GetAllMangaDetailsRow;
}

export default function MangaCard({ manga }: MangaCardProps) {
  const imageUrl = manga.cover_image_path.replaceAll('\\', '/');
  

  return (
    <Card>
      <CardContent>
       
          <img src={imageUrl} alt={`Cover for ${manga.title}`} style={{ maxWidth: '100%', height: 'auto' }} />
     
      </CardContent>
      <CardFooter>
        <CardTitle>{manga.title}</CardTitle>
        <p>{imageUrl}</p>
      </CardFooter>
    </Card>
  );
}