import { getServerSession } from '@/app/api/getServerSession'
import { MoviesProps } from '@/app/types'

export async function getMovies(props: any) {
  const { accessToken } = await getServerSession()
  const page = parseInt(props.page) || 1

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

  if (!res.ok) throw new Error('Failed to fetch movies')

  const movies: { data: MoviesProps; totalPages: number } = await res.json()

  // Return our movies and create a pagination object so we can navigate through the pages
  return {
    movies: movies.data,
    pagination: {
      currentPage: page,
      totalPages: movies.totalPages,
      prevUrl: page > 1 ? (page !== 2 ? `?page=${page - 1}` : `?`) : null,
      nextUrl: movies.totalPages > 1 ? (page < movies.totalPages ? `?page=${page + 1}` : `?page=2`) : null,
    },
  }
}
