'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Cog6ToothIcon,
  FolderIcon,
  ServerIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { 
  Bars3Icon
} from '@heroicons/react/20/solid'
import { User } from 'next-auth'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
// const teams = [
//   { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
//   { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
//   { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
// ]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const SideBar = ({
    user,
    isAdmin,
    children,
  }: Readonly<{
    user: User,
    isAdmin: boolean,
    children: React.ReactNode
  }>) => {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = [
        { name: 'Keys', href: '/', icon: FolderIcon, current: pathname == "/", protected: false },
        { name: 'Key\'s database', href: '/db', icon: ServerIcon, current: pathname == "/db", protected: true },
        { name: 'Administrators', href: '/settings', icon: Cog6ToothIcon, current: pathname == "/settings", protected: true },
    ]

    return (
        <div>
          <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />
  
            <div className="fixed inset-0 flex">
              <DialogPanel
                transition
                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-ice-efrei-dark-blue px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                        alt="ICE EFREI"
                        src="/ina.svg"
                        className="h-12 w-auto"
                      />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            if (item.protected && !isAdmin) return null
                            return (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-ice-efrei-blue text-white'
                                      : 'text-indigo-200 hover:bg-ice-efrei-blue hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
  
          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-ice-efrei-dark-blue px-6">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="ICE EFREI"
                  src="/ina.svg"
                  className="h-12 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => {
                        if (item.protected && !isAdmin) return null
                        return (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-ice-efrei-blue text-white'
                                  : 'text-indigo-200 hover:bg-ice-efrei-blue hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current ? 'text-white' : 'text-blue-200 group-hover:text-white',
                                  'size-6 shrink-0',
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                  <li className="-mx-6 mt-auto">
                    <Link
                      href="/api/auth/signout"
                      title="Log out"
                      className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-ice-efrei-dark-blue"
                    >
                      <img
                        alt=""
                        src={user.image as string | undefined}
                        className="size-8 rounded-full bg-ice-efrei-dark-blue"
                      />
                      <span className="sr-only">Log Out</span>
                      <span aria-hidden="true">{user.name}</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
  
          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-ice-efrei-dark-blue px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-blue-200 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
            <a href="#">
              <span className="sr-only">Your profile</span>
              <img
                alt=""
                src={user.image as string | undefined}
                className="size-8 rounded-full bg-ice-efrei-dark-blue"
              />
            </a>
          </div>
  
          <main className="py-10 lg:pl-72">
            <div className="px-4 sm:px-6 lg:px-8">
                {children}
            </div>
          </main>
        </div>
      )
    }

    // return (
    //     <div>
    //         <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 xl:hidden">
    //         <DialogBackdrop
    //             transition
    //             className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
    //         />

    //         <div className="fixed inset-0 flex">
    //             <DialogPanel
    //             transition
    //             className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
    //             >
    //             <TransitionChild>
    //                 <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
    //                 <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
    //                     <span className="sr-only">Close sidebar</span>
    //                     <XMarkIcon aria-hidden="true" className="size-6 text-white" />
    //                 </button>
    //                 </div>
    //             </TransitionChild>
    //             {/* Sidebar component, swap this element with another sidebar if you like */}
    //             <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-ice-efrei-dark-blue px-6 ring-1 ring-white/10">
    //                 <div className="flex h-16 shrink-0 items-center">
    //                 <img
    //                     alt="ICE EFREI"
    //                     src="/ina.svg"
    //                     className="h-12 w-auto mt-3"
    //                 />
    //                 </div>
    //                 <nav className="flex flex-1 flex-col">
    //                 <ul role="list" className="flex flex-1 flex-col gap-y-7">
    //                     <li>
    //                     <ul role="list" className="-mx-2 space-y-1">
    //                         {navigation.map((item) => {
    //                             if (item.protected && !isAdmin) return null
    //                             return (
    //                                 <li key={item.name}>
    //                                     <a
    //                                     href={item.href}
    //                                     className={classNames(
    //                                         item.current
    //                                         ? 'bg-gray-800 text-white'
    //                                         : 'text-gray-400 hover:bg-gray-800 hover:text-white',
    //                                         'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
    //                                     )}
    //                                     >
    //                                     <item.icon aria-hidden="true" className="size-6 shrink-0" />
    //                                     {item.name}
    //                                     </a>
    //                                 </li>
    //                             )
    //                         })}
    //                     </ul>
    //                     </li>
    //                     {/* <li>
    //                     <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
    //                     <ul role="list" className="-mx-2 mt-2 space-y-1">
    //                         {teams.map((team) => (
    //                         <li key={team.name}>
    //                             <a
    //                             href={team.href}
    //                             className={classNames(
    //                                 team.current
    //                                 ? 'bg-gray-800 text-white'
    //                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white',
    //                                 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
    //                             )}
    //                             >
    //                             <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
    //                                 {team.initial}
    //                             </span>
    //                             <span className="truncate">{team.name}</span>
    //                             </a>
    //                         </li>
    //                         ))}
    //                     </ul>
    //                     </li> */}
    //                     <li className="-mx-6 mt-auto">
    //                     <a
    //                         href="/api/auth/signout"
    //                         title="Log out"
    //                         className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
    //                     >
    //                         <img
    //                         alt=""
    //                         src={user.image as string | undefined}
    //                         className="size-8 rounded-full bg-gray-800"
    //                         />
    //                         <span className="sr-only">Your profile</span>
    //                         <span aria-hidden="true">{user.name}</span>
    //                     </a>
    //                     </li>
    //                 </ul>
    //                 </nav>
    //             </div>
    //             </DialogPanel>
    //         </div>
    //         </Dialog>

    //         {/* Static sidebar for desktop */}
    //         <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
    //         {/* Sidebar component, swap this element with another sidebar if you like */}
    //         <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
    //             <div className="flex h-16 shrink-0 items-center">
    //             <img
    //                 alt="ICE EFREI"
    //                 src="/ina.svg"
    //                 className="h-12 w-auto mt-3"
    //             />
    //             </div>
    //             <nav className="flex flex-1 flex-col">
    //             <ul role="list" className="flex flex-1 flex-col gap-y-7">
    //                 <li>
    //                 <ul role="list" className="-mx-2 space-y-1">
    //                     {navigation.map((item) => {
    //                         if (item.protected && !isAdmin) return null
    //                         return (
    //                             <li key={item.name}>
    //                                 <a
    //                                 href={item.href}
    //                                 className={classNames(
    //                                     item.current
    //                                     ? 'bg-gray-800 text-white'
    //                                     : 'text-gray-400 hover:bg-gray-800 hover:text-white',
    //                                     'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
    //                                 )}
    //                                 >
    //                                 <item.icon aria-hidden="true" className="size-6 shrink-0" />
    //                                 {item.name}
    //                                 </a>
    //                             </li>
    //                         )
    //                     })}
    //                 </ul>
    //                 </li>
    //                 {/* <li>
    //                 <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
    //                 <ul role="list" className="-mx-2 mt-2 space-y-1">
    //                     {teams.map((team) => (
    //                     <li key={team.name}>
    //                         <a
    //                         href={team.href}
    //                         className={classNames(
    //                             team.current
    //                             ? 'bg-gray-800 text-white'
    //                             : 'text-gray-400 hover:bg-gray-800 hover:text-white',
    //                             'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
    //                         )}
    //                         >
    //                         <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
    //                             {team.initial}
    //                         </span>
    //                         <span className="truncate">{team.name}</span>
    //                         </a>
    //                     </li>
    //                     ))}
    //                 </ul>
    //                 </li> */}
    //                 <li className="-mx-6 mt-auto">
    //                 <a
    //                     href="/api/auth/signout"
    //                     title="Log out"
    //                     className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
    //                 >
    //                     <img
    //                     alt=""
    //                     src={user.image as string | undefined}
    //                     className="size-8 object-cover rounded-full bg-gray-800"
    //                     />
    //                     <span className="sr-only">Your profile</span>
    //                     <span aria-hidden="true">{user.name}</span>
    //                 </a>
    //                 </li>
    //             </ul>
    //             </nav>
    //         </div>
    //         </div>
    //         <div className="xl:pl-72">
    //             {/* Sticky search header */}
    //             <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
    //             <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-white xl:hidden">
    //                 <span className="sr-only">Open sidebar</span>
    //                 <Bars3Icon aria-hidden="true" className="size-5" />
    //             </button>

    //             <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
    //                 <form action="#" method="GET" className="grid flex-1 grid-cols-1">
    //                 <input
    //                     name="search"
    //                     type="search"
    //                     placeholder="Search"
    //                     aria-label="Search"
    //                     className="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-white outline-none placeholder:text-gray-500 sm:text-sm/6"
    //                 />
    //                 <MagnifyingGlassIcon
    //                     aria-hidden="true"
    //                     className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-500"
    //                 />
    //                 </form>
    //             </div>
    //             </div>
    //             {children}
    //         </div>
    //     </div>
    // )
// }