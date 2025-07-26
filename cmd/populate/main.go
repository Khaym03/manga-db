package main

import (
	"manga-db/internal/db"
)

func main() {
	dbConn := db.NewSQLiteConn()
	defer dbConn.Close()

	db.NewPopulator(dbConn).Populate()
}
