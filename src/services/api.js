// Mock API Service with Predefined Netflix-like Data

const mockMovies = [
  {
    id: 1,
    title: "Inception",
    backdrop_path: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    trailer_id: "YoHD9XEInc0" // Inception trailer
  },
  {
    id: 2,
    title: "Interstellar",
    backdrop_path: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeVD4vrA9FCPzn.jpg",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    trailer_id: "zSWdZVtXT7E" // Interstellar trailer
  },
  {
    id: 3,
    title: "The Dark Knight",
    backdrop_path: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    trailer_id: "EXeTwQWrcwY" // The Dark Knight
  },
  {
    id: 4,
    title: "Stranger Things",
    name: "Stranger Things",
    backdrop_path: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8OSqFcwl7.jpg",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    trailer_id: "b9EkMc79ZSU" // Stranger things
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    trailer_id: "TcMBFSGVi1c" // Endgame
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    backdrop_path: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vFAenMdzY2.jpg",
    overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.",
    trailer_id: "JfVOs4VSpmA"
  },
  {
    id: 7,
    title: "The Matrix",
    backdrop_path: "https://image.tmdb.org/t/p/original/fQq1FWp1rC89xDrRMuyFJdFUdMd.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    trailer_id: "vKQi3bBA1y8"
  },
  {
    id: 8,
    title: "Joker",
    backdrop_path: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmwpF1SnFlOMlT1.jpg",
    poster_path: "https://image.tmdb.org/t/p/w500/udDclJoHjfpt8IcfozcdBB1cR6s.jpg",
    overview: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    trailer_id: "zAGVQLHvwOY"
  }
];

// Combine mock movies and duplicate them slightly to fill rows
const generateRowData = (seed = 0) => {
  const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
  // Mix in the seed to get slightly different orders
  return shuffled.map(m => ({ ...m, id: m.id + seed * 100 }));
};

export const API_URL = import.meta.env.VITE_TMDB_API_URL || 'mock';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (endpoint) => {
  if (API_URL === 'mock' || !API_KEY) {
    // Return mock data if no API configured
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { results: generateRowData(Math.floor(Math.random() * 10)) } });
      }, 500); // Simulate network latency
    });
  }

  // Real fetch (axios is typically used, but we use native fetch here for simplicity)
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return { data };
};

export const requests = {
  fetchTrending: `/trending/all/week`,
  fetchNetflixOriginals: `/discover/tv?with_networks=213`,
  fetchTopRated: `/movie/top_rated`,
  fetchActionMovies: `/discover/movie?with_genres=28`,
  fetchComedyMovies: `/discover/movie?with_genres=35`,
  fetchHorrorMovies: `/discover/movie?with_genres=27`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749`,
  fetchDocumentaries: `/discover/movie?with_genres=99`,
};
