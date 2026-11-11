"use client"
import { useRouter, useSearchParams } from "next/navigation"

export function CompanyFilter({ companies, basePath }: {
  companies: { id: string; name: string }[]
  basePath: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("company") ?? ""

  return (
    <select
      value={current}
      onChange={e => router.push(e.target.value ? `${basePath}?company=${e.target.value}` : basePath)}
      className="h-10 px-3 border border-[#e2e8f0] rounded-[8px] text-sm text-[#334155] bg-white"
    >
      <option value="">Toutes les sociétés</option>
      {companies.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
  )
}
