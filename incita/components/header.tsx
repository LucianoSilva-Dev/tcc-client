'use client'

import { useAuth } from '@/../contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Image src="/favicon_2d.png" alt="Incita Logo" width={40} height={40} />
            <span className={`ml-2 text-lg font-medium ${isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white transition-colors'}`}>
              Início
            </span>
          </Link>

          <Link
            href="/citar"
            className={`flex items-center ${isActive("/citar") ? "text-white" : "text-gray-300 hover:text-white transition-colors"}`}
          >
            Citações
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full border border-white/20 hover:bg-gray-800 transition-colors"
            >
              Sair
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2 rounded-full border border-white/20 hover:bg-gray-800 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-full bg-amber-200 text-gray-900 hover:bg-amber-300 transition-colors"
              >
                Cadastrar-se
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
