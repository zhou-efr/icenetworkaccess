"use client"

export const GetKeyBtn = async () => {
    return (
        <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
            Récupérer un accès Wireguard
        </button>
    )
}