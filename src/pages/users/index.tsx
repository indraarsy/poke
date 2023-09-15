import React from 'react' 
import Link from "next/link"
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from 'next/router';
import Modal from "@/components/Modal"

type Props = {}

type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const index = (props: Props) => {
  const [curPage, setCurPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")

  const { data } = trpc.getAllUsers.useQuery<User[]>({
    page: curPage,
    name: search
  });

  const router = useRouter();

  const handleRemoveUser = async (id: number) => {
    if(confirm("Are you sure to remove user?")){
      await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer 09c3a826be208e7e47e4c40dad6889c2b1c25b329c8f63d2cbb3fac48794e764', // Add any authentication headers if required
          'Content-Type': 'application/json',
        }
      }).then((resp) => {
        if (resp.status === 204) {
          alert('User removed successfully.');
          router.push("/users")
        } else {
          alert('Failed to remove user.');
        }
      })
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSubmit = async (userData) => {
    // Handle user submission (e.g., send data to an API)
    console.log('User data submitted:', userData);

    await fetch(`https://gorest.co.in/public/v2/users`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer 09c3a826be208e7e47e4c40dad6889c2b1c25b329c8f63d2cbb3fac48794e764', // Add any authentication headers if required
        'Content-Type': 'application/json',
      },
      body: {
        name: 'Jagjot Singh',
        email: 'hahaha@example.com',
        gender: 'male',
        status: 'active'
      }
    }).then((resp) => {
      console.log(resp)
      // if (resp.status === 204) {
      //   alert('User removed successfully.');
      //   router.push("/users")
      // } else {
      //   alert('Failed to remove user.');
      // }
    })
  };

  return (
    <> 
      <title>Users</title>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleUserSubmit} />
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-0 md:px-24 relative`}
      >
        <div className="mx-auto max-w-2xl min-h-screen lg:max-w-5xl dark:bg-zinc-900 p-12 w-full">
          <header className="max-w-5xl">
            <Link
              href="/"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
            </Link>
            <h1 className="text-4xl mt-8 font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">List of Users</h1>
            <div className="flex justify-between gap-4">
              <input onChange={(e) => setSearch(e.target.value) } className="w-full mt-8 border border-neutral-700 rounded-lg p-4 bg-zinc-800" type="text" placeholder="Search" />
              <button className="block md:hidden mt-8 border border-neutral-700 rounded-lg p-4 bg-zinc-800"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
              <button className="hidden md:block mt-8 border border-neutral-700 rounded-lg p-4 bg-zinc-800 w-1/6" onClick={openModal}>Add Users</button>
            </div>
          </header>
          <div className="mb-0 grid pt-8 lg:max-w-5xl gap-4 lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
            {data && data.map((item, index) => (
            <div
              key={item.id}
              className="relative group rounded-lg border border-neutral-700 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <div className="mb-3 flex justify-between">
                <h2 className={`text-2xl font-semibold`}>
                  {item.name}
                </h2>
                <div className="flex gap-4">
                  <button className="block md:hidden"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
                  <button className="block md:hidden"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="red" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
                </div>
              </div>
              <p className={`m-0 text-sm opacity-50`}>
                {item.email} - {" "}
                <span className={`border rounded-full p-1 ${item.status === "active" ? "border-green-400" : "border-red-400"}`}>{item.status}</span>
              </p>
              <button className="absolute top-1/3 right-28 hidden md:block">Edit</button>
              <button className="absolute top-1/3 right-8 text-red-400 hidden md:block" onClick={() => handleRemoveUser(item.id)}>Remove</button>
            </div>
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
              className="border border-neutral-700 rounded-lg p-4"
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
  )
}

export default index
