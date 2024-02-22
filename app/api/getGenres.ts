import { getServerSession } from '@/app/api/getServerSession'

export async function getGenres(props: any) {
  const { accessToken } = await getServerSession()

  const searchParams = new URLSearchParams(Object.entries(JSON.stringify(props))).toString()

  const res = await fetch(`${process.env.API_URL}/movies/genres/${props.id}?${searchParams}`, {
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
