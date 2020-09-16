export async function login(email: string, password: string) {
  // post to /login
  const url = 'https://shoppy-awards-api.herokuapp.com/login'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  const message = await response.json()
  // get token back or error status
  return response.status === 200 ? Promise.resolve(message) 
    : Promise.reject({status: response.status, message})
}