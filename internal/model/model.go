package model

type RawManga struct {
	Title           string   `json:"title"`
	Subtitle        *string  `json:"subtitle"`
	Synopsis        string   `json:"synopsis"`
	Score           float64  `json:"score"`
	Members         int64    `json:"members"`
	CoverImagePath  string   `json:"cover_image_path"`
	Genres          []string `json:"genres"` // Directly map genres as they are clean
	PublicationYear int64    `json:"publication_year"`
	Type            string   `json:"type"`
	Status          string   `json:"status"`
	TotalVolumes    *int64   `json:"total_volumes"`
	TotalChapters   *int64   `json:"total_chapters"`
	Authors         []string `json:"authors"`        // Cleaned authors, can be multiple
	Serializations  []string `json:"serializations"` // Cleaned serializations, can be multiple
	Demographics    []string `json:"demographics"`   // Cleaned demographics, can be multiple
	Themes          []string `json:"themes"`         // Cleaned themes, can be multiple
}
