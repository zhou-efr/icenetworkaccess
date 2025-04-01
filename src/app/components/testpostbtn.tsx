"use client"

export default function TestPostBtn(){
    const handleTestRequest = async () => {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          usermail: "",
          description: "",
          presharedkey: "Test keys",
          uuid: "82e142ac-9cf1-4b52-a03d-19d05849c9ab",	
        }),
      })
      const data = await res.json()
      console.log(data)
    }

    return (
        <button 
        onClick={handleTestRequest}
        className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
        Test post request
        </button>
    )
}