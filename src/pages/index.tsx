import { trpc } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link"
import React, { useState } from "react"

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    limit: 1000
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, limit: formData.name === '' ? 0 : 10000, [name]: value });
  };

  const pokemon = trpc.getPokemons.useQuery({
    page: 1,
    name: formData.name,
    limit: formData.limit
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const filteredPokemon = formData.name === '' ? pokemon.data : pokemon.data?.filter((item) => item.name.includes(formData.name))

  return (
    <>
      <title>Pokedex</title>
      <main
        className={`px-4 pt-12 pb-4 bg-gradient-to-r from-red-50 to-green-50 via-blue-50 min-h-screen`}
      >
        <div className="mx-auto max-w-2xl relative min-h-screen lg:max-w-5xl p-12 w-full">
          <header className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">Pokemon List</h1>
          </header>
          <div className="mt-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Search Pokemon"
              className="w-full border border-neutral-700 rounded-lg p-4 bg-gray-200 text-black"
              required
            />
          </div>
          <div className="mb-0 grid pt-8 lg:max-w-5xl gap-4 lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
            {pokemon.isLoading && (
              <div
                className="flex justify-self-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
              </div>
            )}
            {pokemon.isSuccess && (
              <div className="flex justify-center items-center flex-wrap w-full mt-8">
                {filteredPokemon.map((item) => {
                  return (
                    <React.Fragment key={item.name}>
                      <Link
                        href={`pokemon/${item.name}`}
                        className="w-24 md:w-28 bg-white p-3 m-1 sm:m-2 rounded text-center cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300">
                        <Image
                          className="w-20 h-20 md:w-24 md:h-24 flex justify-center items-center"
                          src={item.image}
                          alt=""
                          width={200}
                          height={200}
                        />
                        <p className="capitalize mt-2 text-gray-600 text-center text-xs w-full sm:text-sm font-bold">{item.name}</p>
                      </Link>
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
