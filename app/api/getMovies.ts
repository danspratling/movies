import { getServerSession } from '@/app/api/getServerSession'
import { Movies } from '@/app/types'

export async function getMovies(props: Movies) {
  const { accessToken } = await getServerSession()
  const page = parseInt(props.page) || 1
  const limit = parseInt(props.limit) || 25

  const searchParams = new URLSearchParams(
    // Props aren't all strings, so we need to convert them to strings
    Object.entries(props).map(([key, value]) => [key, String(value)])
  ).toString()

  // Standard movies API
  const res = await fetch(`${process.env.API_URL}/movies?${searchParams}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  // We fetch the movietitles instead of the main movies API as it's more efficient, as we're fetching all the records - we could remove this if we were given a count
  const titlesRes = await fetch(`${process.env.API_URL}/movies/titles?limit=1000`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to fetch movies')

  const movies = await res.json()
  const movieTitles = await titlesRes.json()

  // Return our movies and create a pagination object so we can navigate through the pages
  return {
    movies: movies.data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(movieTitles.data.length / limit),
      prevUrl: page > 1 ? (page !== 2 ? `?page=${page - 1}` : `?`) : null,
      nextUrl:
        movieTitles.data.length > movies.data.length
          ? page < movieTitles.data.length
            ? `?page=${page + 1}`
            : `?page=2`
          : null,
    },
  }
}
