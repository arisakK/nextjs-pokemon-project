'use server'

export async function getPokemon({
  query,
  page = 1,
  perPage = 1500,
}: {
  query?: string
  page?: number
  perPage?: number
}) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${(page - 1) * 24}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (query) {
      const filteredPokemon = data.results.filter((pokemon: { name: string }) =>
        pokemonNameStartWithQuery(pokemon.name, query.toLowerCase())
      )

      return filteredPokemon.slice(0, 24)
    } else {
      return data.results.slice(0, 24)
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

function pokemonNameStartWithQuery(name: string, query: string) {
  return name.toLowerCase().startsWith(query)
}

export async function fetchPokemon({
  page = 1,
  search,
}: {
  page?: number
  search?: string | undefined
}) {
  try {
    return getPokemon({ query: search, page })
  } catch (e) {
    console.error(e)
  }
}
