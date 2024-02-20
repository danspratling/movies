import { notFound } from 'next/navigation'

export async function getServerSession() {
  // Check we have a session token in localstorage
  let accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('next:session') : undefined

  // We could additionally check if the token is expired

  // If we don't have a token, get a new one
  if (!accessToken) {
    const res = await fetch(`${process.env.API_URL}/auth/token`, {
      method: 'GET',
    })

    if (res.status === 401) notFound()

    accessToken = await res.json()
  }

  if (!accessToken) notFound()

  return { accessToken: accessToken.token }
}
