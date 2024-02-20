import { Metadata } from 'next'
import { getMovies, Movies } from '@/app/api/getMovies'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: { searchParams: Movies }) {
  const movies = await getMovies({ ...searchParams })

  return <div>{JSON.stringify(movies)}</div>
}
