-- +goose Up
-- Table: Manga
-- Stores core information about each manga series.
CREATE TABLE Manga (
    manga_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    synopsis TEXT NOT NULL,
    score REAL NOT NULL, -- REAL for floating-point numbers like 8.24
    members INTEGER NOT NULL, -- Stores parsed member count (e.g., 212000)
    cover_image_path TEXT NOT NULL, -- File path or URL
    publication_year INTEGER NOT NULL,
    type TEXT NOT NULL, -- e.g., "Manga", "Manhwa"
    status TEXT NOT NULL, -- e.g., "Finished", "Ongoing"
    total_volumes INTEGER,
    total_chapters INTEGER
);

-- Table: Genre
-- Stores unique genre names.
CREATE TABLE Genre (
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    genre_name TEXT NOT NULL UNIQUE -- Ensures genre names are unique
);

-- Table: MangaGenre
-- Junction table for many-to-many relationship between Manga and Genre.
CREATE TABLE MangaGenre (
    manga_id INTEGER NOT NULL,
    genre_id INTEGER NOT NULL,
    PRIMARY KEY (manga_id, genre_id), -- Composite primary key
    FOREIGN KEY (manga_id) REFERENCES Manga(manga_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id) ON DELETE CASCADE
);

-- Table: Author
-- Stores unique author/artist names.
CREATE TABLE Author (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_name TEXT NOT NULL UNIQUE -- Ensures author names are unique
);

-- Table: MangaAuthor
-- Junction table for many-to-many relationship between Manga and Author.
CREATE TABLE MangaAuthor (
    manga_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    PRIMARY KEY (manga_id, author_id),
    FOREIGN KEY (manga_id) REFERENCES Manga(manga_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Author(author_id) ON DELETE CASCADE
);


-- Table: Serialization
-- Stores unique serialization magazine/platform names.
CREATE TABLE Serialization (
    serialization_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serialization_name TEXT NOT NULL UNIQUE -- Ensures serialization names are unique
);

-- Table: MangaSerialization
-- Junction table for many-to-many relationship between Manga and Serialization.
CREATE TABLE MangaSerialization (
    manga_id INTEGER NOT NULL,
    serialization_id INTEGER NOT NULL,
    PRIMARY KEY (manga_id, serialization_id),
    FOREIGN KEY (manga_id) REFERENCES Manga(manga_id) ON DELETE CASCADE,
    FOREIGN KEY (serialization_id) REFERENCES Serialization(serialization_id) ON DELETE CASCADE
);

-- Table: Demographic
-- Stores unique demographic names.
CREATE TABLE Demographic (
    demographic_id INTEGER PRIMARY KEY AUTOINCREMENT,
    demographic_name TEXT NOT NULL UNIQUE -- Ensures demographic names are unique
);

-- Table: MangaDemographic
-- Junction table for many-to-many relationship between Manga and Demographic.
CREATE TABLE MangaDemographic (
    manga_id INTEGER NOT NULL,
    demographic_id INTEGER NOT NULL,
    PRIMARY KEY (manga_id, demographic_id),
    FOREIGN KEY (manga_id) REFERENCES Manga(manga_id) ON DELETE CASCADE,
    FOREIGN KEY (demographic_id) REFERENCES Demographic(demographic_id) ON DELETE CASCADE
);

-- NEW Table: Theme
-- Stores unique theme names (e.g., "Psychological", "School", "Gore").
CREATE TABLE Theme (
    theme_id INTEGER PRIMARY KEY AUTOINCREMENT,
    theme_name TEXT NOT NULL UNIQUE -- Ensures theme names are unique
);

-- NEW Table: MangaTheme
-- Junction table for many-to-many relationship between Manga and Theme.
CREATE TABLE MangaTheme (
    manga_id INTEGER NOT NULL,
    theme_id INTEGER NOT NULL,
    PRIMARY KEY (manga_id, theme_id),
    FOREIGN KEY (manga_id) REFERENCES Manga(manga_id) ON DELETE CASCADE,
    FOREIGN KEY (theme_id) REFERENCES Theme(theme_id) ON DELETE CASCADE
);


-- +goose Down
-- Drop tables in reverse order of creation to respect foreign key constraints
DROP TABLE IF EXISTS MangaTheme;
DROP TABLE IF EXISTS Theme;
DROP TABLE IF EXISTS MangaDemographic;
DROP TABLE IF EXISTS Demographic;
DROP TABLE IF EXISTS MangaSerialization;
DROP TABLE IF EXISTS Serialization;
DROP TABLE IF EXISTS MangaAuthor;
DROP TABLE IF EXISTS Author;
DROP TABLE IF EXISTS MangaGenre;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Manga;