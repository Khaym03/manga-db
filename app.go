package main

import (
	"context"
	"fmt"
	"log"
	"manga-db/internal/db"
	mangadb "manga-db/internal/db/sqlite"
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

// Greet returns a greeting for the given name
func (a *App) Greet() []mangadb.GetAllMangaDetailsRow {

	log.Println("runnig Greet method")

	genre, err := a.queries.GetGenreByName(a.ctx, "Action")
	if err != nil {
		fmt.Printf("Error retrieving genre: %v", err)
		return nil
	}
	log.Printf("ID: %d", genre)

	mangas, err := a.queries.GetAllMangaDetails(a.ctx)

	if err != nil {
		fmt.Printf("Error retrieving manga details: %v", err)
	}

	log.Println(mangas)
	return mangas
}
