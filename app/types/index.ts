export type Movie = {
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
  genres: Genre[]
}

export type Movies = Movie[]

export type Genre = {
  id: string
  title: string
}
