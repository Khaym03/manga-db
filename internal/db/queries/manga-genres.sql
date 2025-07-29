-- name: GetMangaGenresByMangaID :many
SELECT
    g.genre_name,
    g.genre_id
FROM
    MangaGenre mg
    JOIN Genre g ON mg.genre_id = g.genre_id
WHERE
    mg.manga_id = ?;