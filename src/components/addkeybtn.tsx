'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Alert from './alert'
import { useRouter, useSearchParams } from 'next/navigation'
import { KeyInterface } from '@/app/api/keys'


export const AddKeyBtn = () => {
    const [open, setOpen] = useState(false)
    const [newKey, setNewKey] = useState<KeyInterface>({
        usermail: '',
        description: '',
        serverpublic: '',
        preshared: '',
        userpublic: '',
        userprivate: '',
        userip: '',
    });
    const [notificationDisplayed, setNotificationDisplayed] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = newKey;
        const res = await fetch("/api/keys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newKey),
        })
        setOpen(false)
        if (res.status == 200){
            router.push("/db?notification=success");
        }
        if (res.status == 400){
            router.push("/db?notification=error");
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewKey({ ...newKey, [name]: value });
    }

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
                className="lock rounded-md bg-ice-efrei-dark-blue px-3 py-2 text-center text-sm font-semibold text-white hover:bg-ice-efrei-blue focus-visible:outline-offset-2 focus-visible:outline-ice-efrei-blue"
                >
                Ajouter
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
                            className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                            >
                            <div className="h-0 flex-1 overflow-y-auto">
                            <div className="px-4 py-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                <DialogTitle className="text-base font-semibold text-gray-900">Ajouter une clef</DialogTitle>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="relative text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                                </div>
                                <div className="mt-1">
                                <p className="text-sm text-gray-500">
                                    { "Ajouter une clef au système de distribution. Attention, ajouter des clefs ne les ajoutes pas dans "+
                                    "la configuration Wireguard, se référer à la documentation sur le notion ICE EFREI. L'INA ne génère pas "+
                                    "de clef, générez des pairs de clefs prépartagé via https://www.wireguardconfig.com/ par exemple"}
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="divide-y divide-gray-300 px-4 sm:px-6">
                                    <div className="space-y-6 pb-5 pt-6">
                                        <label htmlFor="usermail" className="block text-sm font-semibold text-gray-900">
                                            user email (compte ice-efrei.fr obligatoire) (opt)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            id="usermail"
                                            name="usermail"
                                            type="text"
                                            autoComplete="email"
                                            placeholder='example@ice-efrei.fr'
                                            onChange={handleChange}
                                            value={newKey.usermail}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
                                                Description (opt si pas d'email)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="description"
                                                name="description"
                                                type="text"
                                                autoComplete="off"
                                                placeholder='Enter description'
                                                onChange={handleChange}
                                                value={newKey.description}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pb-5 pt-6">
                                        <div>
                                            <label htmlFor="serverpublic" className="block text-sm font-semibold text-gray-900">
                                                Server Public Key
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="serverpublic"
                                                name="serverpublic"
                                                type="text"
                                                autoComplete="off"
                                                required
                                                placeholder='Enter server public key'
                                                onChange={handleChange}
                                                value={newKey.serverpublic}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pb-5 pt-6">
                                        <div>
                                            <label htmlFor="preshared" className="block text-sm font-semibold text-gray-900">
                                                Pre-shared Key
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="preshared"
                                                name="preshared"
                                                type="text"
                                                autoComplete="off"
                                                required
                                                placeholder='Enter pre-shared key'
                                                onChange={handleChange}
                                                value={newKey.preshared}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pb-5 pt-6">
                                            <label htmlFor="userpublic" className="block text-sm font-semibold text-gray-900">
                                                User Public Key
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="userpublic"
                                                name="userpublic"
                                                type="text"
                                                autoComplete="off"
                                                required
                                                placeholder='Enter user public key'
                                                onChange={handleChange}
                                                value={newKey.userpublic}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
                                                />
                                            </div>
                                            <label htmlFor="userprivate" className="block text-sm font-semibold text-gray-900">
                                                User Private Key
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="userprivate"
                                                name="userprivate"
                                                type="text"
                                                autoComplete="off"
                                                required
                                                placeholder='Enter user private key'
                                                onChange={handleChange}
                                                value={newKey.userprivate}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
                                                />
                                            </div>
                                            <label htmlFor="userip" className="block text-sm font-semibold text-gray-900">
                                                User IP Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="userip"
                                                name="userip"
                                                type="text"
                                                autoComplete="off"
                                                required
                                                placeholder='Enter user IP address'
                                                onChange={handleChange}
                                                value={newKey.userip}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
                                                />
                                            </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="flex shrink-0 justify-end px-4 py-4">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-4 inline-flex justify-center rounded-md bg-ice-efrei-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ice-efrei-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice-efrei-blue"
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