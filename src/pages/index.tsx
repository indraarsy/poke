import Image from "next/image";
import { Inter } from "next/font/google";
import { trpc } from "@/utils/trpc";
import Link from "next/link"
import { InputHTMLAttributes, useState } from "react"

const inter = Inter({ subsets: ["latin"] });

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

type Pokemon = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[]
}

export default function Home() {
  const [curPage, setCurPage] = useState<number>(1)

  const [formData, setFormData] = useState({
    name: '',
    limit: 0
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, limit: formData.name === '' ? 0 : 10000, [name]: value });
  };

  const pokemon = trpc.getPokemons.useQuery<Pokemon>({
    page: curPage,
    name: formData.name,
    limit: formData.limit
  }, {
    onSuccess: (resp) => {
      console.log(formData)
      if (formData.name !== '') {
        console.log('woi')
      } else {
        console.log('cok')
        return resp
      }

      return {
        count: resp.count,
        next: resp.next,
        previous: resp.previous,
        results: []
      }
    }
  })

  const filteredPokemon = formData.name === '' ? pokemon.data?.results.splice(0, 12) : pokemon.data?.results.filter((item) => item.name.includes(formData.name))
  console.log(filteredPokemon)

  return (
    <>
      <title>{curPage === 0 ? "Pokemon" : `Pokemon Page ${curPage}`}</title>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-0 md:px-24`}
      >
        <div className="mx-auto max-w-2xl relative min-h-screen lg:max-w-5xl dark:bg-zinc-900 p-12 w-full">
          <header className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">Pokemon List</h1>
          </header>
          <div className="mt-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Search Pokemon"
              className="w-full border border-neutral-700 rounded-lg p-4 bg-gray-200 dark:bg-zinc-800"
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
            {filteredPokemon && filteredPokemon.map((item, index) => (
              <Link
                key={item.name}
                href={`/pokemon/${item.name}`}
                className="group rounded-lg border border-neutral-700 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                rel="noopener noreferrer"
              >
                <h2 className={`text-2xl font-semibold`}>
                  {item.name}
                </h2>
              </Link>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              disabled={curPage === 1}
              className="border border-neutral-700 rounded-lg p-4 disabled:text-gray-500 disabled:hover:cursor-not-allowed"
              onClick={() => {
                setCurPage((prev) => prev - 1)
              }}
            >
              Prev
            </button>
            <button
              className="border border-neutral-700 rounded-lg p-4 disabled:text-gray-500 disabled:hover:cursor-not-allowed"
              onClick={() => {
                setCurPage((prev) => prev + 1)
              }}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
