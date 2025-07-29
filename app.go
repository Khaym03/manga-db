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

func (a *App) GetAllMangas() []model.RawManga {
	mangas, err := a.queries.GetAllMangas(a.ctx)

	var rawMangas []model.RawManga
	for _, manga := range mangas {

		rawMangas = append(rawMangas, toRawManga(manga))
	}

	if err != nil {
		fmt.Printf("Error retrieving manga details: %v", err)
	}

	return rawMangas
}

func (a *App) SearchByTitle(title string) []model.RawManga {
	mangas, err := a.queries.SearchMangaByTitle(a.ctx, title)

	if err != nil {
		fmt.Printf("Error searching manga by title: %v", err)
		return nil
	}

	var rawMangas []model.RawManga
	for _, manga := range mangas {
		rawMangas = append(rawMangas, toRawManga(manga))
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

func toRawManga(manga mangadb.Manga) model.RawManga {
	return model.RawManga{
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
