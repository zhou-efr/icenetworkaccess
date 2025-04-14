"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function AttributeKeyForm({
    setOpen,
    usermail
}:{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    usermail: string
}) {
    const router = useRouter();
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("AttributeKeyForm handleSubmit");
        
        const res = await fetch(`/api/keys/attribute?description=${description}`,{
            method: "GET",
            credentials: "include",
        })
        if (!res.ok) {
            router.push("/?notification=error");
            setOpen(false);
            return;
        }
        router.push("/?notification=success");
        setOpen(false);
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex h-full flex-col divide-y divide-gray-200"
            >
            <div className="h-0 flex-1 overflow-y-auto">
            <div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-300 px-4 sm:px-6">
                    <div className="space-y-6 pb-5 pt-6">
                        <label htmlFor="usermail" className="block text-sm font-semibold text-gray-900">
                            user email (compte ice-efrei.fr obligatoire)
                        </label>
                        <div className="mt-2">
                            <input
                            id="usermail"
                            name="usermail"
                            type="text"
                            autoComplete="email"
                            placeholder='example@ice-efrei.fr'
                            value={usermail}
                            disabled
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
                                Description (opt)
                            </label>
                            <div className="mt-2">
                                <input
                                id="description"
                                name="description"
                                type="text"
                                autoComplete="off"
                                placeholder='Enter description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm"
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
    )
}