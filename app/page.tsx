import { Metadata } from 'next'
import { getMoviesByGenres } from '@/app/api/getMoviesByGenre'
import { getMovies } from '@/app/api/getMovies'
import type { GenresProps, MoviesProps, PaginationProps } from '@/app/types'
import Image from 'next/image'
import { Pagination } from '@/app/components/Pagination'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: { searchParams: { [x: string]: any } }) {
  const genres: GenresProps = await getMoviesByGenres({})
  const { movies, pagination }: { movies: MoviesProps; pagination: PaginationProps } = await getMovies({
    ...searchParams,
  })

  const selectedGenre = genres.find(genre => genre.title === searchParams.genre)

  return (
    <div className='container'>
      <div className='flex gap-2 overflow-auto py-4'>
        {genres.map(genre => (
          <a
            href={selectedGenre?.title !== genre.title ? `/?genre=${genre.title}` : '/'}
            className={`block p-2 text-nowrap border border-white hover:bg-white hover:text-black ${
              selectedGenre?.title === genre.title ? 'bg-white text-black' : ''
            }`}
          >
            {genre.title}
          </a>
        ))}
      </div>
      <div className='flex gap-8 flex-wrap justify-center'>
        {movies.map(({ id, title, posterUrl }) => (
          <Link href={`/movies/${id}`} key={id} className='max-w-64 group'>
            <h2>{title}</h2>
            <Image
              src={posterUrl}
              alt={title}
              width={250}
              height={375}
              className='group-hover:opacity-60 duration-200'
            />
          </Link>
        ))}
      </div>

      <Pagination {...pagination} />
    </div>
  )
}
