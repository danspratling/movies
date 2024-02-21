import { getMovie } from '@/app/api/getMovie'
import type { Movie } from '@/app/types'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Movie #${params.id}`,
    description: 'Movie description',
  }
}

export default async function Page({ params, searchParams }: { params: { id: string }; searchParams: Movie }) {
  const movie: Movie = await getMovie({ ...params, ...searchParams })
  const { title, rating, posterUrl, summary, duration, directors, mainActors, ratingValue, bestRating, genres } = movie

  const [hours, minutes] = duration
    .replace(/P|T|M/g, '')
    .split('H')
    .map(time => parseInt(time))

  return (
    <div className='container'>
      <h1 className='text-5xl'>{title}</h1>
      <p className='text-xl'>{summary}</p>
      {/* This is a messy approach to pluralisation but does the job and accounts for 0 hours/minutes */}
      <p>
        Runtime:{' '}
        <span>
          {hours} {hours ? (hours > 1 ? 'hours' : 'hour') : ''}
        </span>{' '}
        and{' '}
        <span>
          {minutes} {minutes ? (minutes > 1 ? 'minutes' : 'minutes') : ''}
        </span>
      </p>
      {/* Could replace this with the rating images for familiarity */}
      <p>{rating}</p>
      <p>Directors: {directors.join(',')}</p>
      <p>Actors: {mainActors.join(',')}</p>
      <p>
        Rating: {ratingValue}/{bestRating}
      </p>
      <div>
        {genres.map((genre, index) => (
          <>
            <a key={genre.id} href={`/?genre=${genre.title}`} className='underline hover:no-underline'>
              {genre.title}
            </a>
            {index !== genres.length - 1 && ', '}
          </>
        ))}
      </div>
      <Image src={posterUrl} alt={title} width={250} height={375} />
      {/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
    </div>
  )
}
