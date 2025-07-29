-- name: InsertManga :one
INSERT INTO
    Manga (
        title,
        subtitle,
        synopsis,
        score,
        members,
        cover_image_path,
        publication_year,
        type,
        status,
        total_volumes,
        total_chapters
    )
VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING manga_id;

-- name: GetMangaIDByTitle :one
SELECT
    manga_id
FROM
    Manga
WHERE
    title = ?;

-- name: GetGenreByName :one
SELECT
    genre_id
FROM
    Genre
WHERE
    genre_name = ?;

-- name: InsertGenre :one
INSERT INTO
    Genre (genre_name)
VALUES
    (?) RETURNING genre_id;

-- name: InsertMangaGenre :exec
INSERT
OR IGNORE INTO MangaGenre (manga_id, genre_id)
VALUES
    (?, ?);

-- name: GetAuthorByName :one
SELECT
    author_id
FROM
    Author
WHERE
    author_name = ?;

-- name: InsertAuthor :one
INSERT INTO
    Author (author_name)
VALUES
    (?) RETURNING author_id;

-- name: InsertMangaAuthor :exec
INSERT
OR IGNORE INTO MangaAuthor (manga_id, author_id)
VALUES
    (?, ?);

-- name: GetSerializationByName :one
SELECT
    serialization_id
FROM
    Serialization
WHERE
    serialization_name = ?;

-- name: GetSerializationByMangaID :one
SELECT
    serialization_name
FROM
    Serialization
WHERE
    serialization_id = ?;


-- name: InsertSerialization :one
INSERT INTO
    Serialization (serialization_name)
VALUES
    (?) RETURNING serialization_id;

-- name: InsertMangaSerialization :exec
INSERT
OR IGNORE INTO MangaSerialization (manga_id, serialization_id)
VALUES
    (?, ?);

-- name: GetDemographicByName :one
SELECT
    demographic_id
FROM
    Demographic
WHERE
    demographic_name = ?;

-- name: GetDemographicByMangaID :one
SELECT
    demographic_name
FROM
    Demographic
WHERE
    demographic_id = ?;

-- name: InsertDemographic :one
INSERT INTO
    Demographic (demographic_name)
VALUES
    (?) RETURNING demographic_id;

-- name: InsertMangaDemographic :exec
INSERT
OR IGNORE INTO MangaDemographic (manga_id, demographic_id)
VALUES
    (?, ?);

-- name: GetThemeByName :one
SELECT
    theme_id
FROM
    Theme
WHERE
    theme_name = ?;



-- name: InsertTheme :one
INSERT INTO
    Theme (theme_name)
VALUES
    (?) RETURNING theme_id;

-- name: InsertMangaTheme :exec
INSERT
OR IGNORE INTO MangaTheme (manga_id, theme_id)
VALUES
    (?, ?);

-- name: GetAllMangas :many
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
    m.total_chapters
FROM
    Manga m;



-- Manteniendo el límite si es necesario para paginación o resultados top
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
ORDER BY
    m.title
LIMIT
    ?;