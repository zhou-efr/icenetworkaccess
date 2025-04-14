"use client"
import { KeyInterface } from "@/app/api/keys"
import { useRouter } from "next/navigation"

export default function DBTable({
    presharedkeys
}:{
    presharedkeys: KeyInterface[]
}){
    const router = useRouter();

    const deleteKey = async (uuid: string) => {
        const res = await fetch("/api/keys", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            uuid: uuid,
          }),
        })
        if (res.status == 200){
            router.refresh()
        }
    }

    return ( 
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Mail
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Clef publique serveur
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Clef partagée
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Clef publique utilisateur
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Clef privée utilisateur
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        IP utilisateur
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        UUID
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {presharedkeys.map((presharedkey) => (
                        <tr key={presharedkey.uuid}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{presharedkey.usermail}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.description}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.serverpublic}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.preshared}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.userpublic}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.userprivate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.userip}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{presharedkey.uuid}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            {/* <a href="#" className="text-ice-efrei-dark-blue hover:text-ice-efrei-blue">
                            Edit<span className="sr-only">, {presharedkey.uuid}</span>
                            </a> */}
                            <button 
                                onClick={() => {deleteKey(presharedkey.uuid as string)}}
                                className="text-ice-efrei-dark-blue hover:text-ice-efrei-blue ml-4 cursor-pointer"
                            >
                            Delete<span className="sr-only">, {presharedkey.uuid}</span>
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}