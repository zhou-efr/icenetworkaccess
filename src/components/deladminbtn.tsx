'use client'

import { useEffect, useState } from 'react'
import Alert from './alert'
import { useRouter, useSearchParams } from 'next/navigation'



export const DelAdminBtn = ({usermail}:{usermail: string}) => {
    const [notificationDisplayed, setNotificationDisplayed] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = async () => {
        
        const res = await fetch("/api/admin", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            usermail: usermail,
          }),
        })
        if (res.status == 200){
            router.push("/settings?"+usermail+"-notification=success");
        }
        if (res.status == 400){
            router.push("/settings?"+usermail+"-notification=error");
        }
    }

    useEffect(() => {
        if (searchParams.get(usermail+'-notification') == "success" || searchParams.get(usermail+'-notification') == "error"){
            setNotificationDisplayed(true);
            setTimeout(() => {
                setNotificationDisplayed(false);
            }, 3000);
        }
    }, [searchParams]);

    return (
        <>
            <Alert 
                type={searchParams.get(usermail+'-notification') == "success" ? "success" : "error"} 
                title={searchParams.get(usermail+'-notification') == "success" ? "Succès" : "Erreur"} 
                text={searchParams.get(usermail+'-notification') == "success" ? "Administrateur a été supprimé avec succès" : "Erreur lors de la suppression de l'administrateur"} 
                displayed={notificationDisplayed} 
            />
            <a href="#" onClick={handleClick} className="text-blue-300 hover:text-indigo-300">
                Remove<span className="sr-only">, {usermail}</span>
            </a>
        </>
    )
}