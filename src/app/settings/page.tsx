import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdmins, getAdminTable } from "../api/admin";
import { AddAdminBtn } from "@/components/addadminbtn";
import AdminTable from "@/components/admintable";

export default async function Settings(){
    const session = await auth();
    if (!session) redirect("/api/auth/signin");
    const adminmails = await getAdmins();
    if (!adminmails.includes(session.user?.email as string)) redirect("/api/auth/signin");
    const admins = await getAdminTable();
    return (
            <div className="mx-auto max-w-7xl">
              <div className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold text-gray-900">
                        Liste des administrateurs de l'INA
                      </h1>
                    </div>
                    <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
                      <AddAdminBtn />
                    </div>
                  </div>
                  <AdminTable adminList={admins} />
                </div>
              </div>
            </div>
        // <div className="mx-auto max-w-7xl">
        //   <div className="py-10">
        //     <div className="px-4 sm:px-6 lg:px-8">
        //       <div className="sm:flex sm:items-center">
        //         <div className="sm:flex-auto">
        //           <h1 className="text-base font-semibold text-white">Administrateurs</h1>
        //           <p className="mt-2 text-sm text-gray-300">
        //             Liste des administrateurs de l'INA
        //           </p>
        //         </div>
        //         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        //           {/* <button
        //             type="button"
        //             className="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        //           >
        //             Add admin
        //           </button> */}
        //           <AddAdminBtn />
        //         </div>
        //       </div>
        //       <div className="mt-8 flow-root">
        //         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        //           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        //             <table className="min-w-full divide-y divide-gray-700">
        //               <thead>
        //                 <tr>
        //                   <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
        //                     id
        //                   </th>
        //                   <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
        //                     Mail
        //                   </th>
        //                   <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
        //                     <span className="sr-only">Remove</span>
        //                   </th>
        //                 </tr>
        //               </thead>
        //               <tbody className="divide-y divide-gray-800">
        //                 {admins.map((admin, index) => (
        //                   <tr key={index}>
        //                     <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
        //                       {admin.id}
        //                     </td>
        //                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{admin.usermail}</td>
        //                     <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        //                       <DelAdminBtn usermail={admin.usermail} />
        //                     </td>
        //                   </tr>
        //                 ))}
        //               </tbody>
        //             </table>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
    )
  }