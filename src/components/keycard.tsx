"use client"
import { ArrowDownOnSquareStackIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function KeyCard({
    keyInfo,
    onView,
    onDownload
}:{
    keyInfo: {[key: string]: string},
    onView: (uuid: string) => void,
    onDownload: (uuid: string) => void
}) {
  return (
    <li key={keyInfo.uuid} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">{keyInfo.uuid}</h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{keyInfo.description}</p>
        </div>
        <img 
            alt="" 
            src={`https://github.com/identicons/${keyInfo.uuid.replace(/\s/g,"").replace(/-/g,"")}.png`} 
            className="size-10 shrink-0 rounded-full bg-gray-300" 
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              onClick={() => {onDownload(keyInfo.uuid)}}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-text-ice-efrei-dark-blue hover:opacity-50 cursor-pointer"
            >
              <ArrowDownOnSquareStackIcon aria-hidden="true" className="size-5 text-ice-efrei-dark-blue" />
              {"Télécharger"}
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              onClick={() => {onView(keyInfo.uuid)}}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-text-ice-efrei-dark-blue hover:opacity-50 cursor-pointer"
            >
              <EyeIcon aria-hidden="true" className="size-5 text-ice-efrei-dark-blue" />
              Voir
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
