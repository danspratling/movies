import { getServerSession } from '@/app/api/getServerSession'

export type Movie = {
  id?: string
}

export async function getMovie(props: Movie) {
  const { accessToken } = await getServerSession()
  const { id } = props

  if (!id) throw new Error('No movie ID provided')

  const res = await fetch(`${process.env.API_URL}/movies/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Failed to fetch movie')

  const movie = await res.json()

  return movie
}
