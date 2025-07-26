package utils

import (
	"encoding/json"
	"log"
	"os"
)

func ReadJSON[T any](filename string) []T {
	file, err := os.Open(filename)
	if err != nil {
		log.Println(err)
	}
	defer file.Close()

	var data []T
	err = json.NewDecoder(file).Decode(&data)
	if err != nil {
		log.Println(err)
	}

	return data
}

func ObtainUniques[T comparable](items []T) []T {
	set := NewSet[T]()
	for _, item := range items {
		set.Add(item)
	}

	return set.ToSlice()
}
