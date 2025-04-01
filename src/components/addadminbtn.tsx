'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Alert from './alert'
import { useRouter, useSearchParams } from 'next/navigation'



export const AddAdminBtn = () => {
    const [open, setOpen] = useState(false)
    const [newAdminMail, setNewAdminMail] = useState('');
    const [notificationDisplayed, setNotificationDisplayed] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const res = await fetch("/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            usermail: newAdminMail,
          }),
        })
        setOpen(false)
        if (res.status == 200){
            router.push("/settings?notification=success");
        }
        if (res.status == 400){
            router.push("/settings?notification=error");
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
                text={searchParams.get('notification') == "success" ? "Administrateur ajouté avec succès" : "Erreur lors de l'ajout de l'administrateur"} 
                displayed={notificationDisplayed} 
            />
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                Add admin
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-50">
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel
                        transition
                        className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                        <form 
                            onSubmit={handleSubmit}
                            className="flex h-full flex-col divide-y divide-gray-200 bg-ice-efrei-dark-blue shadow-xl"
                            >
                            <div className="h-0 flex-1 overflow-y-auto">
                            <div className="px-4 py-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                <DialogTitle className="text-base font-semibold text-white">Ajouter un administrateur</DialogTitle>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                                </div>
                                <div className="mt-1">
                                <p className="text-sm text-indigo-300">
                                    Ajouter un compte ayant accès aux onglets d'administration.
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                    <div className="space-y-6 pb-5 pt-6">
                                        <div>
                                        <label htmlFor="usermail" className="block text-sm/6 font-medium font-semibold text-white">
                                            Administrator email (compte ice-efrei.fr obligatoire)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            id="usermail"
                                            name="usermail"
                                            type="text"
                                            autoComplete="email"
                                            required
                                            placeholder='example@ice-efrei.fr'
                                            onChange={(e) => setNewAdminMail(e.target.value)}
                                            value={newAdminMail}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="flex shrink-0 justify-end px-4 py-4">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                            </div>
                        </form>
                        </DialogPanel>
                    </div>
                    </div>
                </div>
                </Dialog>
        </>
    )
}