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

  getAllPosts: procedure
    .input(
      z.object({
        page: z.number()
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const page = input.page

      const fetchPosts = await fetch(`https://gorest.co.in/public/v2/posts${page === 1 ? "" : `?page=${page}`}`);
      return fetchPosts.json();
    }),

  getAllUsers: procedure
    .input(
      z.object({
        page: z.number(),
        name: z.string()
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const { page, name } = input

      const querystring = qs.stringify({
        page: page === 1 ? 1 : page,
        name: name ? name : ""
      })

      const fetchUsers = await fetch(`https://gorest.co.in/public/v2/users?${querystring}`);
      return fetchUsers.json();
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

      const url = await fetch(`${POKEMON_URL}/pokemon?${querystring}`)
      return url.json()

    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
