import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdmins } from "../api/admin";
import { getKeys, KeyInterface } from "../api/keys"
import DBTable from "@/components/dbtable";
import { AddKeyBtn } from "@/components/addkeybtn";
import { AddBulkBtn } from "@/components/addbulkbtn";

  
export default async function DB() {
    const session = await auth();
    if (!session) redirect("/api/auth/signin");
    const admins = await getAdmins();
    if (!admins.includes(session.user?.email as string)) redirect("/api/auth/signin");
    const presharedkeys = await getKeys() as KeyInterface[];
    console.log(presharedkeys);
    return (
        <div className="mx-auto max-w-7xl">
          <div className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold text-gray-900">Pre shared keys</h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Liste de toutes les clefs prépartagées du Wireguard lowcaltech
                  </p>
                </div>
                <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
                  <AddKeyBtn />
                  <AddBulkBtn />
                </div>
              </div>
              <DBTable presharedkeys={presharedkeys} />
            </div>
          </div>
        </div>
    )
  }
  