import { Metadata } from 'next'
import { getMoviesByGenres } from '@/app/api/getMoviesByGenre'
import { getMovies } from '@/app/api/getMovies'
import type { Genres, Movies } from '@/app/types'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: { searchParams: Genres }) {
  const genres: Genres = await getMoviesByGenres({})
  const { movies, pagination } = await getMovies({ ...searchParams })

  console.log(movies, pagination)

  const selectedGenre = genres.find(genre => genre.title === searchParams.genre)

  return (
    <>
      <header className='container py-2 flex justify-between items-center mt-4'>
        <h1 className='text-6xl font-bold'>Movies</h1>
        <form action='/' className='flex gap-2'>
          {/* Retain the genre filter if the user has set it */}
          {searchParams.genre && <input type='hidden' name='genre' value={searchParams.genre} />}

          <input
            type='search'
            name='search'
            placeholder='Search by title'
            className='p-2 text-black placeholder:text-gray-500'
            defaultValue={searchParams.title}
          />
          <button type='submit' className='border border-white p-2 hover:bg-white hover:text-black'>
            Search
          </button>
        </form>
      </header>
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
          {movies.map(({ id, title, rating, posterUrl }) => (
            <a href={`/movies/${id}`} key={id} className='max-w-64'>
              <h2>{title}</h2>
              <Image src={posterUrl} alt={title} width={250} height={375} />
            </a>
          ))}
        </div>

        <pre>{JSON.stringify(movies, null, 2)}</pre>
      </div>
    </>
  )
}
