"use client"
import { KeyInterface } from "@/app/api/keys"
import { useRouter } from "next/navigation"
import { DelAdminBtn } from "./deladminbtn";

export default function AdminTable({
    adminList
}:{
    adminList: {[key:string]: string}[]
}){
    const router = useRouter();

    return ( 
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        id
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Mail
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Remove</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {adminList.map((admin, index) => (
                        <tr key={"admin-"+index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{admin.id}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{admin.usermail}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <DelAdminBtn usermail={admin.usermail as string} />
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