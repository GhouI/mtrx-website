"use client"

import { useSession } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export default function Page() {
    const { data: session } = useSession()
    if (!session) {
        redirect("/login")
    }else{
        
    }
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}