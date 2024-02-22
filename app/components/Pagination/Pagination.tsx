'use client'

import { type PaginationProps } from '@/app/types'
import Link from 'next/link'

export const Pagination = ({ currentPage, totalPages, prevUrl, nextUrl }: PaginationProps) => {
  return (
    <div className='flex justify-between items-center my-8 w-full'>
      <PaginationButton href={prevUrl}>Previous</PaginationButton>

      <span>
        {currentPage} of {totalPages}
      </span>

      <PaginationButton href={nextUrl}>Next</PaginationButton>
    </div>
  )
}

const PaginationButton = ({ href, children, ...props }: { href: string; children: React.ReactNode }) => {
  if (href !== null) {
    return (
      <Link
        href={href}
        className='block p-2 text-nowrap border border-white hover:bg-white hover:text-black'
        {...props}
      >
        {children}
      </Link>
    )
  }

  return (
    <button disabled className='block p-2 text-nowrap border border-white opacity-35' {...props}>
      {children}
    </button>
  )
}
