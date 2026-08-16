import { auth } from "@/auth"
import { User } from "lucide-react"

interface AppHeaderProps {
  title: string
}

export default async function AppHeader({ title }: AppHeaderProps) {
  const session = await auth()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-[88px] px-8 bg-white border-b border-[#e2e8f0]">
      <h1 className="text-[22px] font-bold text-[#111827]">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
          <User size={16} className="text-[#64748b]" />
          <span className="text-sm text-[#64748b] font-medium">{session?.user?.email}</span>
        </div>
      </div>
    </header>
  )
}
