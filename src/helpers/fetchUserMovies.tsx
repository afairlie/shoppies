export async function fetchUserMovies(res: any) {
  const key = process.env.REACT_APP_OMDB;
  const movie1 = async function() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${res.nominations['1']}&type=movie`)
    return await response.json()
  }()
  const movie2 = async function() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${res.nominations['2']}&type=movie`)
    return await response.json()
  }()
  const movie3 = async function() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${res.nominations['3']}&type=movie`)
    return await response.json()
  }()
  const movie4 = async function() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${res.nominations['4']}&type=movie`)
    return await response.json()
  }()
  const movie5 = async function() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${res.nominations['5']}&type=movie`)
    return await response.json()
  }()
  
  return Promise.all([movie1, movie2, movie3, movie4, movie5])
}