import { z } from "zod";
import { procedure, router } from "../trpc";
const qs = require('qs')

export const POKEMON_URL = "https://pokeapi.co/api/v2/"

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  getPokemons: procedure
    .input(
      z.object({
        limit: z.number().default(12),
        page: z.number(),
        name: z.string()
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const { page, name, limit } = input

      const querystring = qs.stringify({
        limit,
        offset: page === 1 ? 1 : page * limit,
        name: name ? name : ""
      })

      // const test = await fetch(`${POKEMON_URL}/pokemon?${querystring}`)
      //   .then((resp) => resp.json())
      //   .then(async (allPoke) => {
      //     return Promise.all(allPoke.results.map(item => {
      //       return fetch(item.url).then(res => res.json()).then(detailPoke => detailPoke)
      //     }))
      //   }).then(data => data)

      const pokemon = await fetch(`${POKEMON_URL}/pokemon?${querystring}`)
        .then((resp) => resp.json())

      console.log({ pokemon: pokemon.results })

      const pokemonList = pokemon.results.map((result, index) => {
        const paddedIndex = ("00" + (index + 1)).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        return {
          ...result,
          image
        }
      })

      return pokemonList

    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
