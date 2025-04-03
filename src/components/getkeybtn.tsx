"use client"

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from "next/navigation";
import Alert from "./alert";

export const GetKeyBtn = ({usermail}: {usermail: string}) => {
    const [keyDescription, setKeyDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [notificationDisplayed, setNotificationDisplayed] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    

    const handleAssignKey = async () => {
        const res = await fetch("/api/keys/of", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            usermail: usermail,
            description: keyDescription,
          }),
        })
        const data = await res.json()
        console.log(data)
        setOpen(false)
        if (res.status == 200){
            router.push("/?notification=success");
        }
        if (res.status == 400){
            router.push("/?notification=error");
        }
      }

      
      
    useEffect(() => {
        if (searchParams.get('notification') == "success" || searchParams.get('notification') == "error"){
            setNotificationDisplayed(true);
            setTimeout(() => {
                setNotificationDisplayed(false);
            }, 5000);
        }
    }, [searchParams]);

    return (
        <>
            <Alert 
                type={searchParams.get('notification') == "success" ? "success" : "error"} 
                title={searchParams.get('notification') == "success" ? "Succès" : "Erreur"} 
                text={searchParams.get('notification') == "success" ? "Clef ajouté avec succès" : "Erreur lors de l'ajout de la clef"} 
                displayed={notificationDisplayed} 
            />
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="ml-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
                Récupérer un accès Wireguard
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-70">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-ice-efrei-dark-blue px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            {/* <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                                <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
                            </div> */}
                            <div className="">
                                <DialogTitle as="h3" className="text-base text-center font-semibold text-white">
                                {"Récupération de clef d'accès Wireguard"} 
                                </DialogTitle>
                                <div className="mt-2">
                                <p className="text-sm text-center text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                                </p>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                                        Nom de la clef
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="off"
                                        required
                                        onChange={(e) => setKeyDescription(e.target.value)}
                                        value={keyDescription}
                                        placeholder="Laptop xxx"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={handleAssignKey}
                                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 sm:col-start-2"
                            >
                                {"Récupérer"}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 text-white shadow-sm hover:bg-white/20 px-3 py-2 text-sm font-semibold sm:col-start-1 sm:mt-0"
                            >
                                Cancel
                            </button>
                            </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}