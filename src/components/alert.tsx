"use client"
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

const alert_type = {
    error: {
        icon : XCircleIcon,
        icon_color : "text-red-400",
        bg_color : "bg-red-50",
        title_color : "text-red-800",
        text_color : "text-red-700",
    },
    success: {
        icon : CheckCircleIcon,
        icon_color : "text-green-400",
        bg_color : "bg-green-50",
        title_color : "text-green-800",
        text_color : "text-green-700",
    },
}

export default function Alert({type, title, text, displayed}: {type: "error"|"success", title: string, text: string, displayed: boolean}) {
  const Icon = alert_type[type].icon;   

  return (
    <div className={`rounded-md ${alert_type[type].bg_color} p-4 ${displayed ? "" : "hidden"} absolute top-0 right-0 z-60 mt-10 mr-10`}>
      <div className="flex">
        <div className="shrink-0">
          <Icon aria-hidden="true" className={`size-5 ${alert_type[type].icon_color}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${alert_type[type].title_color}`}>{title||"Lorem ipsum"}</h3>
          <div className={`mt-2 text-sm ${alert_type[type].icon_color}`}>
            <p>{text||"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
