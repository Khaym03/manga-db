package db

import (
	"context"
	"database/sql"
	_ "embed"
	"log"

	mangadb "manga-db/internal/db/sqlite"
	"manga-db/internal/model"
	"manga-db/internal/utils"
)

//  dasd go:embed schema.sql
// var ddl string

type RawManga = model.RawManga

type ItemInserter func(ctx context.Context, item string) (int64, error)

type Populator struct {
	db         *sql.DB
	queries    *mangadb.Queries
	connectors []genericPropConnector
}

func NewPopulator(db *sql.DB) Populator {
	queries := mangadb.New(db)
	connectors := NewDefaultConnectors(queries)

	return Populator{
		db:         db,
		queries:    queries,
		connectors: connectors,
	}
}

// func (p Populator) makeTables() error {
// 	log.Println("Creating database tables...")
// 	if _, err := p.db.ExecContext(context.Background(), ddl); err != nil {
// 		return fmt.Errorf("failed to create tables: %w", err)
// 	}
// 	log.Println("Database tables created.")
// 	return nil
// }

func (p Populator) fillTable(ctx context.Context, items []string, inserter ItemInserter, entityName string) {
	for _, item := range items {
		if _, err := inserter(ctx, item); err != nil {
			log.Printf("Error inserting %s '%s': %v", entityName, item, err)
		}
	}
}

// Populate handles full DB ops: create tables, collect unique props, insert all data
func (p Populator) Populate() {
	// if err := p.makeTables(); err != nil {
	// 	log.Fatalf("Failed to create tables: %v", err)
	// }

	rawMangas := utils.ReadJSON[RawManga]("internal/db/cleaned_mangas.json")

	props := NewDefaultPropertyCollector(p)

	// Collect unique property values
	for _, manga := range rawMangas {
		for i := range props {
			for _, val := range props[i].extractor(manga) {
				props[i].set.Add(val)
			}
		}
	}

	ctx := context.Background()

	// Insert unique properties into tables
	for _, prop := range props {
		p.fillTable(ctx, prop.set.ToSlice(), prop.inserter, prop.name)
	}

	// Insert manga records and connect properties
	p.fillMangaTable(rawMangas)

	log.Println("Database population complete.")
}

func (p Populator) fillMangaTable(mangas []RawManga) {
	ctx := context.Background()

	for _, manga := range mangas {
		mangaID, err := p.queries.InsertManga(ctx, toInsertMangaParams(manga))
		if err != nil {
			log.Printf("Error inserting manga '%s': %v", manga.Title, err)
			continue
		}

		for _, conn := range p.connectors {
			if err := conn.Connect(manga, mangaID); err != nil {
				log.Printf("Error connecting manga property: %v", err)
			}
		}
	}
}

func toInsertMangaParams(m RawManga) mangadb.InsertMangaParams {
	return mangadb.InsertMangaParams{
		Title:           m.Title,
		Subtitle:        m.Subtitle,
		Synopsis:        m.Synopsis,
		Score:           m.Score,
		Members:         m.Members,
		CoverImagePath:  m.CoverImagePath,
		PublicationYear: m.PublicationYear,
		Type:            m.Type,
		Status:          m.Status,
		TotalVolumes:    m.TotalVolumes,
		TotalChapters:   m.TotalChapters,
	}
}
