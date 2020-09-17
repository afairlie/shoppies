export async function login(email: string, password: string, name: (string | null)) {
  // post to /login
  const url = `http://localhost:3001/${name ? 'users' : 'login'}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
  const message = await response.json()
  // get token back or error status
  return response.status === 200 ? Promise.resolve(message) 
    : Promise.reject({status: response.status, message})
}