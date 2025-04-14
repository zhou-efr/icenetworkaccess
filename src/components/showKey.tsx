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

    const onDownloadClientConfig = async () => {
        if (!key) return;
    
    const text = `
[Interface]
PrivateKey = ${key.userprivate}
Address = ${key.userip}
DNS = 1.1.1.1

[Peer]
PublicKey = ${key.userpublic}
PresharedKey = ${key.preshared}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = 195.154.182.64:11923
PersistentKeepalive = 25 # plutot pour des serveurs comme gs arm
    `
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', uuid+"-peer.config");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    }

    const onDownloadServerConfig = async () => {
        if (!key) return;
        
        const text = `
[Interface]
Address = 10.0.2.1/24
ListenPort = 11923
PrivateKey = ${process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY}
PostUp   = iptables -A FORWARD -i %i -j ACCEPT
PostUp   = iptables -A FORWARD -o %i -j ACCEPT

#PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
#PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

# Or symply add this to the existing server :
[Peer]
PublicKey = ${key.serverpublic}
PresharedKey = ${key.preshared}
AllowedIPs = ${key.userip}
        `
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', uuid+"-server.config");
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);

    }

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
                        <button onClick={onDownloadServerConfig} className="font-medium text-indigo-400 hover:text-indigo-300">
                          Download
                        </button>
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
                        <button onClick={onDownloadClientConfig} className="font-medium text-indigo-400 hover:text-indigo-300">
                          Download
                        </button>
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