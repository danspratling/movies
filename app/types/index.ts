export type MovieProps = {
  id: string
  title: string
  posterUrl: string
  rating: string
  summary: string
  duration: string
  directors: string[]
  mainActors: string[]
  datePublished: string
  ratingValue: number
  bestRating: number
  worstRating: number
  writers: string[]
  genres: GenreProps[]
}

export type MoviesProps = MovieProps[]

export type GenreProps = {
  id: string
  title: string
}

export type GenresProps = GenreProps[]

export type PaginationProps = {
  currentPage: number
  totalPages: number
  prevUrl: string | null
  nextUrl: string | null
}
