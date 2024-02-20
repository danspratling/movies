import { getServerSession } from '@/app/api/getServerSession'

export type Movies = {
  page?: number
  limit?: number
  search?: string
  genre?: string
}

export async function getMovies(props: Movies) {
  const { accessToken } = await getServerSession()

  const searchParams = new URLSearchParams(
    // Props aren't all strings, so we need to convert them to strings
    Object.entries(props).map(([key, value]) => [key, String(value)])
  ).toString()

  const res = await fetch(`${process.env.API_URL}/movies?${searchParams}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to fetch movies')

  const movies = await res.json()

  return movies.data
}
