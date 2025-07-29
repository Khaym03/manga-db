package db

import (
	"database/sql"
	"log"
	"os"

	_ "modernc.org/sqlite"
)

func NewSQLiteConn() (*sql.DB, error) {
	env := os.Getenv("ENV")
	var dbPath string
	if env == "dev" {
		dbPath = "internal/db/manga.db"
	} else {
		dbPath = "manga.db"
	}

	dbConn, err := sql.Open("sqlite", dbPath)
	if err != nil {
		log.Println("Error opening database:", err)
		return nil, err
	}

	err = dbConn.Ping()
	if err != nil {
		log.Println("Error pinging database:", err)
		return nil, err
	}

	return dbConn, nil
}
