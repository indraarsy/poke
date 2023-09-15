import { POKEMON_URL } from '@/server/routers/_app'
import { GetServerSideProps } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
  name: string;
  abilities: [
    {
      ability: {
        name: string;
        url: string
      },
      name: string;
      url: string
    }
  ],
  forms: [
    {
      name: string;
      url: string
    }
  ],
  stats: [
    {
      base_stat: number;
      effort: number
      stat: {
        name: string;
        url: string
      }
    }
  ],
  types: [
    {
      slot: number,
      type: {
        name: string;
        url: string
      }
    }
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  },
}

const Pokemon = (props: Props) => {
  console.log(props)
  return (
    <>
      <title>{props.name}</title>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-0 md:px-24 relative`}
      >
        <div className="mx-auto max-w-2xl min-h-screen lg:max-w-5xl dark:bg-zinc-900 p-12 w-full">
          <header className="max-w-2xl">
            <Link
              href="/"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" /></svg>
            </Link>
            <h1 className="text-4xl mt-8 font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">{props.name}</h1>
          </header>
          <div className="flex flex-col gap-6">
            <Image className="mt-6" src={props.sprites.other['official-artwork'].front_default} alt={props.name} width={100} height={100} />
            <div className="flex gap-6">
              {props.types && props.types.map((item) => (
                <p className="flex bg-zinc-500 p-1 px-4 rounded-full dark:prose-invert text-white">{item.type.name}</p>
              ))}
            </div>
            <div className="flex gap-6">
              <p className="w-1/6">Forms: </p>
              <div className="flex flex-col">
                {props.forms && props.forms.map((item) => (
                  <p className="flex dark:prose-invert">{item.name}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <p className="w-1/6">Types: </p>
              <div className="flex flex-col">
                {props.types && props.types.map((item) => (
                  <p className="flex dark:prose-invert">{item.type.name}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <p className="w-1/6">Abilities: </p>
              <div className="flex flex-col">
                {props.abilities && props.abilities.map((item) => (
                  <p className="flex dark:prose-invert">{item.ability.name}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <p className="w-1/6">Stats: </p>
              <div className="flex flex-col">
                {props.stats && props.stats.map((item) => (
                  <p className="dark:prose-invert">
                    <progress value={item.base_stat} max="100" />
                    {" "}{item.stat.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Pokemon

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const url = await fetch(`${POKEMON_URL}/pokemon/${query.name}`)
  const resp = await url.json()

  console.log(resp)


  return {
    props: resp
  }
}
