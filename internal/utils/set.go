package utils

type Set[T comparable] map[T]struct{}

func NewSet[T comparable]() Set[T] {
	return make(Set[T])
}

func (s Set[T]) Add(element T) {
	s[element] = struct{}{}
}

func (s Set[T]) Contains(element T) bool {
	_, found := s[element]
	return found
}

func (s Set[T]) Remove(element T) {
	delete(s, element)
}

func (s Set[T]) Size() int {
	return len(s)
}

func (s Set[T]) ToSlice() []T {
	elements := make([]T, 0, len(s))
	for element := range s {
		elements = append(elements, element)
	}
	return elements
}
