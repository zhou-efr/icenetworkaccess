import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-3">
      <div className="overflow-hidden rounded-lg bg-ice-efrei-blue shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex">
            <div className="mr-4 shrink-0">
              <img src={session?.user?.image as string} alt="User Avatar" />
            </div>
            <div>
              <h4 className="text-lg font-bold">{session?.user?.name as string}</h4>
              <p className="mt-1">
                {session?.user?.email as string}
              </p>
            </div>
          </div>
        </div>
      </div>
      <a 
        href="/api/auth/signout"
        className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
      >
        Sign out
        </a>
    </div>
  )
}