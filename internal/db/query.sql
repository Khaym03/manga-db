-- name: InsertManga :execrows
INSERT INTO Manga (
    title, subtitle, synopsis, score, members, cover_image_path,
    publication_year, type, status, total_volumes, total_chapters
) VALUES (
    ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?
);

-- name: GetMangaIDByTitle :one
SELECT manga_id FROM Manga WHERE title = ?;

-- name: GetGenreByName :one
SELECT genre_id FROM Genre WHERE genre_name = ?;

-- name: InsertGenre :one
INSERT INTO Genre (genre_name) VALUES (?)
RETURNING genre_id;

-- name: InsertMangaGenre :exec
INSERT OR IGNORE INTO MangaGenre (manga_id, genre_id) VALUES (?, ?);

-- name: GetAuthorByName :one
SELECT author_id FROM Author WHERE author_name = ?;

-- name: InsertAuthor :one
INSERT INTO Author (author_name) VALUES (?)
RETURNING author_id;

-- name: InsertMangaAuthor :exec
INSERT OR IGNORE INTO MangaAuthor (manga_id, author_id) VALUES (?, ?);

-- name: GetSerializationByName :one
SELECT serialization_id FROM Serialization WHERE serialization_name = ?;

-- name: InsertSerialization :one
INSERT INTO Serialization (serialization_name) VALUES (?)
RETURNING serialization_id;

-- name: InsertMangaSerialization :exec
INSERT OR IGNORE INTO MangaSerialization (manga_id, serialization_id) VALUES (?, ?);

-- name: GetDemographicByName :one
SELECT demographic_id FROM Demographic WHERE demographic_name = ?;

-- name: InsertDemographic :one
INSERT INTO Demographic (demographic_name) VALUES (?)
RETURNING demographic_id;

-- name: InsertMangaDemographic :exec
INSERT OR IGNORE INTO MangaDemographic (manga_id, demographic_id) VALUES (?, ?);

-- name: GetThemeByName :one
SELECT theme_id FROM Theme WHERE theme_name = ?;

-- name: InsertTheme :one
INSERT INTO Theme (theme_name) VALUES (?)
RETURNING theme_id;

-- name: InsertMangaTheme :exec
INSERT OR IGNORE INTO MangaTheme (manga_id, theme_id) VALUES (?, ?);

-- Example Query: Get all Manga with their Genres, Authors, etc.
-- This is a more complex join, demonstrating how to retrieve related data.
-- name: GetMangaDetails :many
SELECT
    m.manga_id,
    m.title,
    m.subtitle,
    m.synopsis,
    m.score,
    m.members,
    m.cover_image_path,
    m.publication_year,
    m.type,
    m.status,
    m.total_volumes,
    m.total_chapters,
    GROUP_CONCAT(DISTINCT g.genre_name) AS genres,
    GROUP_CONCAT(DISTINCT a.author_name) AS authors,
    GROUP_CONCAT(DISTINCT s.serialization_name) AS serializations,
    GROUP_CONCAT(DISTINCT d.demographic_name) AS demographics,
    GROUP_CONCAT(DISTINCT t.theme_name) AS themes
FROM
    Manga m
LEFT JOIN MangaGenre mg ON m.manga_id = mg.manga_id
LEFT JOIN Genre g ON mg.genre_id = g.genre_id
LEFT JOIN MangaAuthor ma ON m.manga_id = ma.manga_id
LEFT JOIN Author a ON ma.author_id = a.author_id
LEFT JOIN MangaSerialization ms ON m.manga_id = ms.manga_id
LEFT JOIN Serialization s ON ms.serialization_id = s.serialization_id
LEFT JOIN MangaDemographic md ON m.manga_id = md.manga_id
LEFT JOIN Demographic d ON md.demographic_id = d.demographic_id
LEFT JOIN MangaTheme mt ON m.manga_id = mt.manga_id
LEFT JOIN Theme t ON mt.theme_id = t.theme_id
WHERE m.manga_id = ? OR ? IS NULL -- Allows fetching a specific manga or all if NULL is passed
GROUP BY m.manga_id
ORDER BY m.title;

-- Example Query: Search Manga by Title Keyword
-- name: SearchMangaByTitle :many
SELECT
    manga_id,
    title,
    subtitle,
    score,
    status
FROM
    Manga
WHERE
    title LIKE ?
ORDER BY title
LIMIT ?;

-- Example Query: Filter Manga by Genre
-- name: FilterMangaByGenre :many
SELECT
    m.manga_id,
    m.title,
    m.subtitle,
    m.score,
    m.status
FROM
    Manga m
JOIN MangaGenre mg ON m.manga_id = mg.manga_id
JOIN Genre g ON mg.genre_id = g.genre_id
WHERE
    g.genre_name = ?
ORDER BY m.title
LIMIT ?;