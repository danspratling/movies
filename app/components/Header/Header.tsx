import { Search } from '../Search'

export const Header = () => {
  return (
    <header className='container py-2 flex justify-between items-center mt-4'>
      <h1 className='text-6xl font-bold'>Movies</h1>
      <Search />
    </header>
  )
}
