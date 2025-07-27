package main

import (
	"context"
	"fmt"
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
	mangas, err := a.queries.GetAllMangaDetails(a.ctx)

	if err != nil {
		fmt.Printf("Error retrieving manga details: %v", err)
	}

	return mangas
}
