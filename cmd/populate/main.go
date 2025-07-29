package main

import (
	"manga-db/internal/db"
)

func main() {
	dbConn, err := db.NewSQLiteConn()
	if err != nil {
		panic("Failed to connect to the database: " + err.Error())
	}
	defer dbConn.Close()

	db.NewPopulator(dbConn).Populate()
}
