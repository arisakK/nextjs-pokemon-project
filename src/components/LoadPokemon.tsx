'use client'

import { fetchPokemon } from '@/actions/getPokemon'
import PokemonCard, { Pokemon } from '@/components/PokemonCard'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ClipLoader from 'react-spinners/ClipLoader'

const LoadPokemon = ({
  search,
  initialPokemon,
}: {
  search: string | undefined
  initialPokemon: Pokemon[] | undefined
}) => {
  const [pokemon, setPokemon] = useState(initialPokemon)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(true)

  const { inView, ref } = useInView()

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const loadMorePokemon = async () => {
    setLoading(true)
    await delay(1000)
    const nextPage = page + 1
    const newPokemon = await fetchPokemon({
      search,
      page: nextPage,
    })
    setPage(nextPage)
    setPokemon((prev) => {
      if (!prev) {
        return newPokemon
      }

      const uniquePokemon = newPokemon.filter(
        (pokemon: Pokemon) => !prev.some((p) => p.name === pokemon.name)
      )

      return [...prev, ...uniquePokemon]
    })
    setLoading(false)
  }

  useEffect(() => {
    if (inView) {
      loadMorePokemon()
    }
  }, [inView])

  return (
    <>
      <div className="grid sm:grid-cols-4 log:grid-cols-3 gap-10">
        {pokemon?.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.url} pokemon={pokemon} />
        ))}
      </div>
      <div>
        {pokemon && pokemon.length >= 24 && (
          <div className="flex justify-center items-center p-4" ref={ref}>
            <ClipLoader color="#fff" />
          </div>
        )}
      </div>
    </>
  )
}

export default LoadPokemon
