"use client"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'
import KeyCard from '@/components/keycard';
import { useEffect, useState } from 'react';
import Drawer from "@/components/drawer";
import ShowKey from "@/components/showKey";
import Alert from "@/components/alert";
import AttributeKeyForm from "@/components/attributekeyform";

export default function Home() {
  const { data: session } = useSession()
  const [keys, setKeys] = useState<{[key: string]: string}[]>([])
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [drawerTitle, setDrawerTitle] = useState<string>("")
  const [viewKeyUUID, setViewKeyUUID] = useState<string>("")
  const [notificationDisplayed, setNotificationDisplayed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (!session) router.push("/api/auth/signin");
  console.log({usermail: session?.user?.email});

  const onGetKey = () => {
    setOpenDrawer(true);
    setDrawerTitle("Récupération d'un accès Wireguard");
    setViewKeyUUID("");
  }

  const onView = (uuid: string) => {
    console.log(uuid);
    setOpenDrawer(true);
    setDrawerTitle("Voir "+uuid);
    setViewKeyUUID(uuid);
  }
  
  const onDownload = async (uuid: string) => {
    console.log(uuid);

    const key = await fetch("/api/keys?uuid=" + uuid, {
      method: "GET",
      credentials: "include"
    })
    if (!key.ok) return;
    const data = await key.json()
    
    let text = `
[Interface]
PrivateKey = ${data.userprivate}
Address = ${data.userip}
DNS = 1.1.1.1

[Peer]
PublicKey = ${data.clientpublic}
PresharedKey = ${data.preshared}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ${process.env.NEXT_PUBLIC_SERVER_IP}
PersistentKeepalive = 25 # plutot pour des serveurs comme gs arm
    `
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', uuid+"-client.config");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  useEffect(() => {
    const fetchKeys = async () => {
      const res = await fetch("/api/keys/of?usermail=" + session?.user?.email, {
        method: "GET",
        credentials: "include"
      })

      if (!res.ok) return;

      const data = await res.json()

      setKeys(data)
    }
    if (searchParams.get('notification') == "success" || searchParams.get('notification') == "error"){
        setNotificationDisplayed(true);
        setTimeout(() => {
            setNotificationDisplayed(false);
            router.push("/");
        }, 5000);
    }

    if (session) {
      fetchKeys()
    }  
  }, [searchParams])

  return (
    <>
      <Alert 
          type={searchParams.get('notification') == "success" ? "success" : "error"} 
          title={searchParams.get('notification') == "success" ? "Succès" : "Erreur"} 
          text={searchParams.get('notification') == "success" ? "Clef attribué avec succès" : "Erreur lors de l'attribution de la clef"} 
          displayed={notificationDisplayed} 
      />
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            ICE Network Access
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={onGetKey}
            className="ml-3 inline-flex items-center rounded-md bg-ice-efrei-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ice-efrei-blue focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ice-efrei-blue"
          >
            Récupérer un accès Wireguard
          </button>
        </div>
      </div>
      
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {
          keys.map((key: {[key: string]: string}, index) => (
            <KeyCard 
              key={"key-"+index}
              keyInfo={key}
              onView={onView}
              onDownload={onDownload}
            />
          ))
        }
      </ul>
      <Drawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        title={drawerTitle}
      >
        {
          viewKeyUUID ? <ShowKey uuid={viewKeyUUID} /> : <AttributeKeyForm setOpen={setOpenDrawer} usermail={session?.user?.email as string} />
        }
      </Drawer>
    </>
  )
}
//   return (
//     <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
//       <div className="md:flex md:items-center md:justify-between">
//         <div className="min-w-0 flex-1">
//           <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
//             ICE Network Access
//           </h2>
//         </div>
//         <div className="mt-4 flex md:ml-4 md:mt-0">
//           <GetKeyBtn usermail={session.user?.email as string} />
//         </div>
//       </div>
//       <ul role="list" className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {keys.map((key, index) => (
//           <li key={index} className="col-span-1 divide-y divide-gray-200/20 rounded-lg bg-white/5 shadow">
//             <div className="flex w-full items-center justify-between space-x-6 p-6">
//               <div className="flex-1 truncate">
//                 <div className="flex items-center space-x-3">
//                   <h3 className="truncate text-sm font-medium text-white">{key.uuid}</h3>
//                   {/* <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
//                     {person.role}
//                   </span> */}
//                 </div>
//                 <p className="mt-1 truncate text-sm text-white">{key.description}</p>
//               </div>
//               <img alt="" src={`https://github.com/identicons/${key.uuid.replace(/\s/g,"").replace(/-/g,"")}.png`} className="size-10 shrink-0 rounded-full bg-white" />
//             </div>
//             <div>
//               <div className="-mt-px flex divide-x divide-gray-200/20">
//                 <div className="flex w-0 flex-1">
//                   <a
//                     href={`/${key.uuid}/download`}
//                     className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-white"
//                   >
//                     <ArrowDownOnSquareStackIcon aria-hidden="true" className="size-5 text-white" />
//                     Download
//                   </a>
//                 </div>
//                 <div className="-ml-px flex w-0 flex-1">
//                   <a
//                     href={`/${key.uuid}/show`}
//                     className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white"
//                   >
//                     <EyeIcon aria-hidden="true" className="size-5 text-white" />
//                     Show
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </main>
//   )
// }


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