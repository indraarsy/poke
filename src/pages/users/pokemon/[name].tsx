import { POKEMON_URL } from '@/server/routers/_app'
import { GetServerSideProps } from 'next'
import React from 'react'

type Props = {}

const Pokemon = () => {
  return (
    <div>Pokemon</div>
  )
}

export default Pokemon

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const url = await fetch(`${POKEMON_URL}/pokemon/${query.name}`)
  const resp = await url.json()

  console.log(resp)


  return {
    props: {
      meta: {
        title: `Post ${query.id}`
      },
    }
  }
}
