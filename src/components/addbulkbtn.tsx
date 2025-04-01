'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Alert from './alert'
import { useRouter, useSearchParams } from 'next/navigation'
import { KeyInterface } from '@/app/api/keys'


export const AddBulkBtn = () => {
    const [open, setOpen] = useState(false)
    const [newKey, setNewKey] = useState<Array<KeyInterface>>([]);
    const [notificationDisplayed, setNotificationDisplayed] = useState(false);
    const [filename, setFilename] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLoadFile = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (!file) return;
            setFilename(file.name);
            const contents = await file?.text();
            if (!contents) return;
            const data = JSON.parse(contents);
            console.log(data.bulk);
            setNewKey(data.bulk);
        }
        input.click();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({newKey});
        const data = {
            bulk: newKey
          };
        console.log(data);
        
        const res = await fetch("/api/keys/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        })
        setOpen(false)
        if (res.status == 200){
            router.push("/db?bulknotification=success");
        }
        if (res.status == 400){
            router.push("/db?bulknotification=error");
        }
    }

    useEffect(() => {
        if (searchParams.get('bulknotification') == "success" || searchParams.get('bulknotification') == "error"){
            setNotificationDisplayed(true);
            setTimeout(() => {
                setNotificationDisplayed(false);
            }, 5000);
        }
    }, [searchParams]);

    return (
        <>
            <Alert 
                type={searchParams.get('bulknotification') == "success" ? "success" : "error"} 
                title={searchParams.get('bulknotification') == "success" ? "Succès" : "Erreur"} 
                text={searchParams.get('bulknotification') == "success" ? "Clef ajouté avec succès" : "Erreur lors de l'ajout de la clef"} 
                displayed={notificationDisplayed} 
            />
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                Bulk add
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
                                <DialogTitle className="text-base font-semibold text-white">Ajouter une clef</DialogTitle>
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
                                    {"Charger un fichier au format adéquat pour charger plusieurs clefs à la fois."}
                                </p>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleLoadFile}
                                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                        className="mx-auto size-12 text-gray-400"
                                    >
                                        <path
                                        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span className="mt-2 block text-sm font-semibold text-white">
                                        {filename ? filename : "Load file to import"}
                                    </span> 
                                    </button>
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