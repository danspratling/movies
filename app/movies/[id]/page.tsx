import { getMovie, Movie } from '@/app/api/getMovie'

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Movie #${params.id}`,
    description: 'Movie description',
  }
}

export default async function Page({ params, searchParams }: { params: { id: string }; searchParams: Movie }) {
  const movie = await getMovie({ id: params.id, ...searchParams })

  return <div>{JSON.stringify(movie)}</div>
}
