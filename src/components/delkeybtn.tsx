'use client'

import { useEffect, useState } from 'react'
import Alert from './alert'
import { useRouter, useSearchParams } from 'next/navigation'



export const DelKeyBtn = ({uuid}:{uuid: string}) => {
    const [notificationDisplayed, setNotificationDisplayed] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = async () => {
        
        const res = await fetch("/api/keys", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            uuid: uuid,
          }),
        })
        if (res.status == 200){
            router.push("/db?"+uuid+"-notification=success");
        }
        if (res.status == 400){
            router.push("/db?"+uuid+"-notification=error");
        }
    }

    useEffect(() => {
        if (searchParams.get(uuid+'-notification') == "success" || searchParams.get(uuid+'-notification') == "error"){
            setNotificationDisplayed(true);
            setTimeout(() => {
                setNotificationDisplayed(false);
            }, 3000);
        }
    }, [searchParams]);

    return (
        <>
            <Alert 
                type={searchParams.get(uuid+'-notification') == "success" ? "success" : "error"} 
                title={searchParams.get(uuid+'-notification') == "success" ? "Succès" : "Erreur"} 
                text={searchParams.get(uuid+'-notification') == "success" ? "Administrateur a été supprimé avec succès" : "Erreur lors de la suppression de l'administrateur"} 
                displayed={notificationDisplayed} 
            />
            <a href="#" onClick={handleClick} className="text-indigo-400 hover:text-indigo-300">
                Delete<span className="sr-only">, {uuid}</span>
            </a>
        </>
    )
}