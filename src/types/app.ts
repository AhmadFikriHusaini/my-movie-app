export interface MovieListProps{
    title: string,
    path: string,
    coverType: 'poster' | 'backdrop'
}

export interface Movie {
  adult: boolean,
  name: string,
  backdrop_path: string,
  genre_ids: [],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}
  
export interface MovieItemProps {
  movie: Movie
  size: { width: number; height: number }
  coverType: 'poster' | 'backdrop'
}

export interface MovieCollectionsProps {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string
  }

  export interface MovieDetailProps {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: undefined,
    budget: number,
    genres: [
      {
        id: number, 
        name: string 
      }
    ],
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: string[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: [
      {
        id: number
        logo_path: string,
        name: string,
        origin_country: string,
      }
    ],
    production_countries: [
      {
        iso_3166_1: string,
        name: string,
      }
    ],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [
      {
        english_name: string,
        iso_639_1: string,
        name: string,
      }
    ],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
  }
  