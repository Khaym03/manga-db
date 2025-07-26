package db

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

func NewSQLiteConn() *sql.DB {
	dbConn, err := sql.Open("sqlite", "internal/db/manga.db")
	if err != nil {
		log.Println(err)
	}

	err = dbConn.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return dbConn
}
