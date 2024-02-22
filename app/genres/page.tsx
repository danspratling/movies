import { Metadata } from 'next'
import { getMoviesByGenres } from '@/app/api/getMoviesByGenre'
import { GenresProps } from '@/app/types'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: any) {
  const genres: GenresProps = await getMoviesByGenres({ ...searchParams })

  return (
    <div>
      <h1>Genres</h1>

      <div>
        {genres.map(({ id, title }) => (
          <a key={id} href={`/movies/genres/${id}`} className='underline hover:no-underline'>
            {title}
          </a>
        ))}
      </div>
    </div>
  )
}
