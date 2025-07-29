import React, { useState, useEffect, createContext, useContext } from 'react';
import { model } from '../../wailsjs/go/models';
import { GetAllMangas } from '../../wailsjs/go/main/App';

interface MangaContextType {
  manga: model.RawManga[];
  isLoading: boolean;
  setManga: React.Dispatch<React.SetStateAction<model.RawManga[]>>
  error: string | null;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const useManga = () => {
  const context = useContext(MangaContext);
  if (context === undefined) {
    throw new Error('useManga must be used within a MangaProvider');
  }
  return context;
};

export default function MangaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [manga, setManga] = useState<model.RawManga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await GetAllMangas(); // Asegúrate de que Greet() devuelve el array de mangas
        setManga(result);
      } catch (err) {
        console.error("Error fetching manga:", err);
        setError("Failed to load manga data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchManga();
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar

  const contextValue: MangaContextType = {
    manga,
    setManga,
    isLoading,
    error,
  };

  return (
    <MangaContext.Provider value={contextValue}>
      {children}
    </MangaContext.Provider>
  );
}