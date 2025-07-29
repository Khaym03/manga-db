package main

import (
	"context"
	"fmt"
	"manga-db/internal/db"
	mangadb "manga-db/internal/db/sqlite"
	"manga-db/internal/model"
)

// App struct
type App struct {
	ctx     context.Context
	queries *mangadb.Queries
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	dbConn := db.NewSQLiteConn()

	a.queries = mangadb.New(dbConn)

}

func (a *App) GetAllMangas() []model.Manga {
	mangas, err := a.queries.GetAllMangas(a.ctx)

	var rawMangas []model.Manga
	for _, manga := range mangas {
		rawMangas = append(rawMangas, a.optainMangaProps(manga))
	}

	if err != nil {
		fmt.Printf("Error retrieving manga details: %v", err)
	}

	return rawMangas
}

func (a *App) SearchByTitle(title string) []model.Manga {
	mangas, err := a.queries.SearchMangaByTitle(a.ctx, "%"+title+"%")

	if err != nil {
		fmt.Printf("Error searching manga by title: %v", err)
		return nil
	}

	var rawMangas []model.Manga
	for _, manga := range mangas {
		rawMangas = append(rawMangas, a.optainMangaProps(manga))
	}

	return rawMangas
}

func (a *App) GetAllGenres() []mangadb.Genre {
	genres, err := a.queries.GetAllGenres(a.ctx)

	if err != nil {
		fmt.Printf("Error retrieving genres: %v", err)
		return nil
	}

	return genres
}

func toRawManga(manga mangadb.Manga) model.Manga {
	return model.Manga{
		ID: manga.MangaID,

		Title:           manga.Title,
		Subtitle:        manga.Subtitle,
		Synopsis:        manga.Synopsis,
		Score:           manga.Score,
		Members:         manga.Members,
		CoverImagePath:  manga.CoverImagePath,
		PublicationYear: manga.PublicationYear,
		Type:            manga.Type,
		Status:          manga.Status,
		TotalVolumes:    manga.TotalVolumes,
		TotalChapters:   manga.TotalChapters,
	}
}

func (a *App) optainMangaProps(m mangadb.Manga) model.Manga {
	genres, err := a.queries.GetMangaGenresByMangaID(a.ctx, m.MangaID)
	if err != nil {
		fmt.Printf("Error retrieving genres for manga ID %d: %v", m.MangaID, err)
	}
	manga := toRawManga(m)

	manga.Genres = genres

	return manga
}
