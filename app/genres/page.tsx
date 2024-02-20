import { Metadata } from 'next'
import { getGenres, Genres } from '@/app/api/getGenres'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: { searchParams: Genres }) {
  const genres = await getGenres({ ...searchParams })

  console.log({ genres })

  return <div>{JSON.stringify(genres)}</div>
}
