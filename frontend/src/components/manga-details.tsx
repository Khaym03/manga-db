import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'; // Adjust path if necessary
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { useManga } from './app-provider'; // Import useManga to get selectedManga
import type { model } from 'wailsjs/go/models'; 
import type React from 'react';
import { CardDescription } from './ui/card';

// This component will render the details of the selected manga in a Sheet
export default function MangaDetailSheet() {
  const { selectedManga, setSelectedManga } = useManga();

  // Determine if the sheet should be open based on whether a manga is selected
  const isSheetOpen = selectedManga !== null;

  // Function to close the sheet (by setting selectedManga to null)
  const handleCloseSheet = () => {
    setSelectedManga(null);
  };

  if (!selectedManga) {
    return null; // Don't render anything if no manga is selected
  }

  const imageUrl = selectedManga.cover_image_path.replaceAll('\\', '/');

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
      {/* SheetTrigger is not needed here as it's triggered by setting selectedManga */}
      <SheetContent side="right" className="max-w-xl sm:max-w-2xl md:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{selectedManga.title}</SheetTitle>
        
          
          {selectedManga.subtitle && (
            <SheetDescription>{selectedManga.subtitle}</SheetDescription>
          )}
        </SheetHeader>

        {/* Manga Details */}
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[calc(100vh-120px)] px-8"> {/* Added overflow for long content */}
          <div className="flex justify-center mb-4">
            <img
              src={imageUrl}
              alt={`Cover for ${selectedManga.title}`}
              className="max-h-[300px] object-cover rounded-md shadow-lg"
            />
          </div>

          <CardDescription>
            {selectedManga.synopsis}
          </CardDescription>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <strong>Score:</strong> {selectedManga.score} <Star size={14} className="inline-block align-text-bottom" />
            </div>
            <div>
              <strong>Members:</strong> {selectedManga.members.toLocaleString()}
            </div>
            <div>
              <strong>Year:</strong> {selectedManga.publication_year}
            </div>
            <div>
              <strong>Type:</strong> {selectedManga.type}
            </div>
            <div>
              <strong>Status:</strong> {selectedManga.status}
            </div>
            {selectedManga.total_volumes && (
              <div>
                <strong>Volumes:</strong> {selectedManga.total_volumes}
              </div>
            )}
            {selectedManga.total_chapters && (
              <div>
                <strong>Chapters:</strong> {selectedManga.total_chapters}
              </div>
            )}
            <div>
              <strong>Genres:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedManga.genres && selectedManga.genres.length > 0 ? (
                  selectedManga.genres.map((genre) => (
                    <Badge key={genre.genre_id} variant="secondary">
                      {genre.genre_name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">No genres available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
