import { Metadata } from 'next'
import { getMoviesByGenres } from '../api/getMoviesByGenre'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Page title',
  description: 'Page description',
}

export default async function Page({ searchParams }: { searchParams: Genres }) {
  const genres = await getMoviesByGenres({ ...searchParams })

  return (
    <div>
      <h1>Genres</h1>

      <div>
        {genres.map(({ id, title, movies }) => (
          <a key={id} href={`/movies/genres/${id}`} className='underline hover:no-underline'>
            {title}
          </a>
        ))}
      </div>
    </div>
  )
}
