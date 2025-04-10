'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  
  // Função para verificar se o link está ativo
  const isActive = (path: string) => {
    return pathname === path
  }

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
        </div>
        <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  )
}
