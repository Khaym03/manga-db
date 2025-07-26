package db

import (
	"context"
	"fmt"

	mangadb "manga-db/internal/db/sqlite"
)

type PropertyIDGetter func(ctx context.Context, name string) (int64, error)
type MangaPropertyInserter func(ctx context.Context, mangaID, propertyID int64) error
type PropertyExtractor func(manga RawManga) []string

type genericPropConnector struct {
	extractPropertyNames PropertyExtractor
	getIDByName          PropertyIDGetter
	insertMangaProperty  MangaPropertyInserter
}

func (g genericPropConnector) Connect(manga RawManga, mangaID int64) error {
	ctx := context.Background() // Could be improved by passing ctx down

	for _, propName := range g.extractPropertyNames(manga) {
		propID, err := g.getIDByName(ctx, propName)
		if err != nil {
			return fmt.Errorf("get ID failed for '%s': %w", propName, err)
		}

		if err := g.insertMangaProperty(ctx, mangaID, propID); err != nil {
			return fmt.Errorf("link insert failed for '%s': %w", propName, err)
		}
	}
	return nil
}

func NewDefaultConnectors(queries *mangadb.Queries) []genericPropConnector {
	return []genericPropConnector{
		{
			extractPropertyNames: authorsExtractor,
			getIDByName:          queries.GetAuthorByName,
			insertMangaProperty: func(ctx context.Context, mangaID, propID int64) error {
				return queries.InsertMangaAuthor(ctx, mangadb.InsertMangaAuthorParams{MangaID: mangaID, AuthorID: propID})
			},
		},
		{
			extractPropertyNames: demographicExtractor,
			getIDByName:          queries.GetDemographicByName,
			insertMangaProperty: func(ctx context.Context, mangaID, propID int64) error {
				return queries.InsertMangaDemographic(ctx, mangadb.InsertMangaDemographicParams{MangaID: mangaID, DemographicID: propID})
			},
		},
		{
			extractPropertyNames: serializationExtractor,
			getIDByName:          queries.GetSerializationByName,
			insertMangaProperty: func(ctx context.Context, mangaID, propID int64) error {
				return queries.InsertMangaSerialization(ctx, mangadb.InsertMangaSerializationParams{MangaID: mangaID, SerializationID: propID})
			},
		},
		{
			extractPropertyNames: genresExtractor,
			getIDByName:          queries.GetGenreByName,
			insertMangaProperty: func(ctx context.Context, mangaID, propID int64) error {
				return queries.InsertMangaGenre(ctx, mangadb.InsertMangaGenreParams{MangaID: mangaID, GenreID: propID})
			},
		},
		{
			extractPropertyNames: themesExtractor,
			getIDByName:          queries.GetThemeByName,
			insertMangaProperty: func(ctx context.Context, mangaID, propID int64) error {
				return queries.InsertMangaTheme(ctx, mangadb.InsertMangaThemeParams{MangaID: mangaID, ThemeID: propID})
			},
		},
	}
}
