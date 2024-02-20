import { getServerSession } from '@/app/api/getServerSession'

export type Genres = {
  page?: number
  limit?: number
}

export async function getGenres(props: Genres) {
  const { accessToken } = await getServerSession()

  const searchParams = new URLSearchParams(Object.entries(JSON.stringify(props))).toString()

  const res = await fetch(`${process.env.API_URL}/genres/movies?${searchParams}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to fetch movie genres')

  const genres = await res.json()

  return genres.data
}
