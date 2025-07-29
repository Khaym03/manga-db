-- name: SearchMangaByTitle :many
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
    Manga m
WHERE
    m.title LIKE ?;