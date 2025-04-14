"use client"
import { KeyInterface } from "@/app/api/keys";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function ShowKey({
    uuid
}:{
    uuid: string
}){
    const [key, setKey] = useState<KeyInterface>();

    useEffect(() => {
        async function fetchKey(){
            const res = await fetch("/api/keys?uuid=" + uuid, {
                method: "GET",
                credentials: "include"
            })
            if (!res.ok) return;
            const data = await res.json()
            console.log(data);
            
            setKey(data)
        }
        fetchKey();
    }, [])

    return (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">Key details</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
          </div>
          <div className="mt-6 border-t border-gray-300">
            <dl className="divide-y divide-gray-300">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">UUID</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.uuid}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.description}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Server public key</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.serverpublic}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Preshared key</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.preshared}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">User public key</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.userpublic}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">User private key</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.userprivate}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">User ip</dt>
                <dd className="mt-1 text-sm/6 text-gray-500 sm:col-span-2 sm:mt-0">{key?.userip}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-white/10 rounded-md border border-white/20">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-500" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">server.config</span>
                          <span className="shrink-0 text-gray-500">2.4mb</span>
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
                        <PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-500" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">peer.config</span>
                          <span className="shrink-0 text-gray-500">4.5mb</span>
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
    )
}