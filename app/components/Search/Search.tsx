'use client'

import { useSearchParams } from 'next/navigation'

export const Search = () => {
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre')
  const title = searchParams.get('title')

  return (
    <form action='/' className='flex gap-2'>
      {/* Retain the genre filter if the user has set it */}
      {genre && <input type='hidden' name='genre' value={genre} />}

      <input
        type='search'
        name='search'
        placeholder='Search by title'
        className='p-2 text-black placeholder:text-gray-500'
        defaultValue={title || ''}
      />
      <button type='submit' className='border border-white p-2 hover:bg-white hover:text-black'>
        Search
      </button>
    </form>
  )
}
