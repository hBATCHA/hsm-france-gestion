"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  House,
  Users,
  Package,
  Layers,
  ClipboardList,
  FileText,
  Banknote,
  Download,
  Settings,
  LogOut,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: House, label: "Tableau de bord" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/produits", icon: Package, label: "Produits" },
  { href: "/stock", icon: Layers, label: "Stock" },
  { href: "/bons-de-livraison", icon: ClipboardList, label: "Bons de livraison" },
  { href: "/factures", icon: FileText, label: "Factures" },
  { href: "/paiements", icon: Banknote, label: "Paiements" },
  { href: "/exports", icon: Download, label: "Exports" },
  { href: "/parametres", icon: Settings, label: "Paramètres" },
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[280px] flex-col bg-white border-r border-[#e2e8f0]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#e2e8f0]">
        <div className="shrink-0 w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="H.S.M.FRANCE">
            <defs>
              <linearGradient id="boxFront" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#F0FDF4" />
                <stop offset="1" stopColor="#BBF7D0" />
              </linearGradient>
            </defs>
            <g transform="translate(22 30)" fill="none" stroke="#166534" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
              <path fill="url(#boxFront)" d="M12 48 78 16l66 32v76l-66 32-66-32z" />
              <path d="M12 48l66 33 66-33M78 81v75M45 32l66 33" />
              <path d="M31 66v50M49 75v50M12 91h66M12 116h66" strokeWidth="4" opacity=".75" />
              <path d="M101 87v34h26V87h-8v9h-10v-9z" fill="#166534" />
              <path d="M78 16V0" />
              <path d="M78 7C60 6 51-3 48-15 64-16 76-9 78 7Z" fill="#22C55E" />
              <path d="M80 6c18-2 28-12 31-25-17 0-28 8-31 25Z" fill="#15803D" />
            </g>
          </svg>
        </div>
        <div>
          <p className="text-sm font-extrabold text-[#166534] leading-tight tracking-wide">H.S.M.FRANCE</p>
          <p className="text-[10px] text-[#64748b] tracking-widest uppercase mt-0.5">Import · Distribuer · Partager</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 h-[52px] px-4 rounded-[10px] text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#166534] text-white"
                  : "text-[#111827] hover:bg-[#f0fdf4] hover:text-[#166534]"
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-[#e2e8f0]">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 w-full h-[52px] px-4 rounded-[10px] text-sm font-medium text-[#64748b] hover:bg-[#fef2f2] hover:text-[#dc2626] transition-colors"
        >
          <LogOut size={20} />
          Se déconnecter
        </button>
      </div>
    </aside>
  )
}
