// Exo 1 renvoyer le mediant

function computeAverageScore(tab: number[]) {
  let count = 0;
  if (tab.length == 0) return 0;
  return [...tab].reduce((acc, current) => acc + current, 0)/tab.length;
}

//Exo 2

type Movie = {
  id: number;
  title: string;
  rating: number;
};

function filterAndSort(
  movies: Movie[],
  minRating: number,
  sortBy: "title" | "rating"
): Movie[] {

  let filteredMovies = movies.filter(
    (movie) => movie.rating > minRating
  );

  if (sortBy === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === "title") {
    filteredMovies.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return filteredMovies;
}

const film1: Movie = {
  id: 1,
  title: "cars",
  rating: 5
}
const film2: Movie = {
  id: 2,
  title: "a",
  rating: 4
}
const film3: Movie = {
  id: 3,
  title: "bar 3",
  rating: 3
}
const film4: Movie = {
  id: 4,
  title: "FNAF",
  rating: 0
}


console.log(filterAndSort([film1, film2, film3, film4], 2, "rating"));
console.log(filterAndSort([film1, film2, film3, film4], 2, "title"));
