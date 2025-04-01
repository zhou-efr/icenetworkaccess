import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdmins } from "../api/admin";
import { getKeys } from "../api/keys"
import { AddKeyBtn } from "@/components/addkeybtn";
import { DelKeyBtn } from "@/components/delkeybtn";
import { AddBulkBtn } from "@/components/addbulkbtn";

  
export default async function DB() {
    const session = await auth();
    if (!session) redirect("/api/auth/signin");
    const admins = await getAdmins();
    if (!admins.includes(session.user?.email as string)) redirect("/api/auth/signin");
    const presharedkeys = await getKeys() as Array<{[key: string]: string}>;
    console.log(presharedkeys);
    return (
        <div className="mx-auto max-w-7xl">
          <div className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold text-white">Pre shared keys</h1>
                  <p className="mt-2 text-sm text-gray-300">
                    Liste de toutes les clefs prépartagées du Wireguard lowcaltech
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-3">
                  <AddKeyBtn/>
                  <AddBulkBtn/>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white sm:pl-0">
                            Mail
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Description
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Clef publique serveur
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Clef partagée
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Clef publique utilisateur
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            Clef privée utilisateur
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                            IP utilisateur
                          </th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white">
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
                      <tbody className="divide-y divide-gray-800">
                        {presharedkeys.map((presharedkey) => (
                          <tr key={presharedkey.usermail}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{presharedkey.usermail}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.description}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.serverpublic}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.preshared}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.userpublic}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.userprivate}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.userip}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{presharedkey.uuid}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                Edit<span className="sr-only">, {presharedkey.uuid}</span>
                              </a>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <DelKeyBtn uuid={presharedkey.uuid}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
  