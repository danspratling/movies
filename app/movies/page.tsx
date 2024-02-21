import { Metadata } from 'next'
import { getMovies } from '@/app/api/getMovies'
import Image from 'next/image'
import type { Movies } from '@/app/types'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: { searchParams: Movies }) {
  const movies: Movies = await getMovies({ ...searchParams })

  return (
    <div className='container'>
      <h1>Movies</h1>
      <div className='flex gap-8 flex-wrap justify-center'>
        {movies.map(({ id, title, rating, posterUrl }) => (
          <a href={`/movies/${id}`} key={id} className='max-w-64'>
            <h2>{title}</h2>
            <Image src={posterUrl} alt={title} width={250} height={375} />
          </a>
        ))}
      </div>

      {/* <pre>{JSON.stringify(movies, null, 2)}</pre> */}
    </div>
  )
}
