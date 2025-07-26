package db

import "manga-db/internal/utils"

type propertyCollector struct {
	name      string
	extractor PropertyExtractor
	inserter  ItemInserter
	set       utils.Set[string]
}

func NewDefaultPropertyCollector(p Populator) []propertyCollector {
	return []propertyCollector{
		{
			name:      "authors",
			extractor: authorsExtractor,
			inserter:  p.queries.InsertAuthor,
			set:       utils.NewSet[string](),
		},
		{
			name:      "genres",
			extractor: genresExtractor,
			inserter:  p.queries.InsertGenre,
			set:       utils.NewSet[string](),
		},
		{
			name:      "demographics",
			extractor: demographicExtractor,
			inserter:  p.queries.InsertDemographic,
			set:       utils.NewSet[string](),
		},
		{
			name:      "serializations",
			extractor: serializationExtractor,
			inserter:  p.queries.InsertSerialization,
			set:       utils.NewSet[string](),
		},
		{
			name:      "themes",
			extractor: themesExtractor,
			inserter:  p.queries.InsertTheme,
			set:       utils.NewSet[string](),
		},
	}
}

// Extraction functions:
func genresExtractor(manga RawManga) []string        { return manga.Genres }
func authorsExtractor(manga RawManga) []string       { return manga.Authors }
func serializationExtractor(manga RawManga) []string { return manga.Serializations }
func demographicExtractor(manga RawManga) []string   { return manga.Demographics }
func themesExtractor(manga RawManga) []string        { return manga.Themes }
