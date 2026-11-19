// Countries service api

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = async () => {
  const response = await fetch(API_URL)
  return response.json()
}

export default { getAll }