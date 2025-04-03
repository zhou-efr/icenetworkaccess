
import { ArrowDownOnSquareStackIcon, EyeIcon } from '@heroicons/react/24/outline'
import { getKeysOf } from '../api/keys/of'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { GetKeyBtn } from '@/components/getkeybtn';
import { getKey, KeyInterface } from '../api/keys';
import { PaperClipIcon } from '@heroicons/react/20/solid'

export default async function Home({
  params,
}: {
  params: Promise<{ keyuuid?: string[] }>
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  console.log({usermail: session.user?.email});
  
  const keys = await getKeysOf(session.user?.email as string)
  console.log(keys)
  
  let key : KeyInterface | null = null;
  let format = "show";

  const { keyuuid } = await params
  console.log({keyuuid});
  

  if (keyuuid) {
    const uuid = keyuuid[0];
    if (keyuuid[1] && keyuuid[1] === "download") {
      format = "download";
    }

    key = await getKey(uuid);
    console.log(key);
  }

  return (
    <>
      {
        !!key && format === "show" &&
        <div className="z-70 fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in">

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex w-screen min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    className="relative transform overflow-hidden rounded-lg bg-ice-efrei-dark-blue px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div>
                    <div className="px-4 sm:px-0">
                      <h3 className="text-base/7 font-semibold text-white">Key details</h3>
                      <p className="mt-1 max-w-2xl text-sm/6 text-gray-400">Personal details and application.</p>
                    </div>
                    <div className="mt-6 border-t border-white/10">
                      <dl className="divide-y divide-white/10">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">UUID</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.uuid}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">Description</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.description}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">Server public key</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.serverpublic}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">Preshared key</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.preshared}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">User public key</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.userpublic}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">User private key</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.userprivate}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">User ip</dt>
                          <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{key?.userip}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm/6 font-medium text-white">Attachments</dt>
                          <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-white/10 rounded-md border border-white/20">
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                <div className="flex w-0 flex-1 items-center">
                                  <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">server.config</span>
                                    <span className="shrink-0 text-gray-400">2.4mb</span>
                                  </div>
                                </div>
                                <div className="ml-4 shrink-0">
                                  <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                                    Download
                                  </a>
                                </div>
                              </li>
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                <div className="flex w-0 flex-1 items-center">
                                  <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">peer.config</span>
                                    <span className="shrink-0 text-gray-400">4.5mb</span>
                                  </div>
                                </div>
                                <div className="ml-4 shrink-0">
                                  <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                                    Download
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                </div>
            </div>
        </div>
      }
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
              ICE Network Access
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            {/* <button
              type="button"
              className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
            >
              Edit
            </button> */}
            <GetKeyBtn usermail={session.user?.email as string} />
          </div>
        </div>
        <ul role="list" className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, index) => (
            <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-ice-efrei-blue shadow">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-white">{key.uuid}</h3>
                    {/* <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {person.role}
                    </span> */}
                  </div>
                  <p className="mt-1 truncate text-sm text-white">{key.description}</p>
                </div>
                <img alt="" src={`https://github.com/identicons/${key.uuid.replace(/\s/g,"").replace(/-/g,"")}.png`} className="size-10 shrink-0 rounded-full bg-white" />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`/${key.uuid}/download`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-white"
                    >
                      <ArrowDownOnSquareStackIcon aria-hidden="true" className="size-5 text-white" />
                      Download
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`/${key.uuid}/show`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white"
                    >
                      <EyeIcon aria-hidden="true" className="size-5 text-white" />
                      Show
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}


// import { auth } from "@/auth"
// import { redirect } from 'next/navigation'
// import TestPostBtn from "./components/testpostbtn"

// export default async function Home() {
//   const session = await auth()
//   if (!session) redirect("/api/auth/signin")

//   return (
//     <div className="h-screen flex flex-col items-center justify-center gap-3">
//       <div className="overflow-hidden rounded-lg bg-ice-efrei-blue shadow">
//         <div className="px-4 py-5 sm:p-6">
//           <div className="flex">
//             <div className="mr-4 shrink-0">
//               <img src={session?.user?.image as string} alt="User Avatar" />
//             </div>
//             <div>
//               <h4 className="text-lg font-bold">{session?.user?.name as string}</h4>
//               <p className="mt-1">
//                 {session?.user?.email as string}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <a 
//         href="/api/auth/signout"
//         className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
//       >
//         Sign out
//       </a>
//       <TestPostBtn />
//     </div>
//   )
// }