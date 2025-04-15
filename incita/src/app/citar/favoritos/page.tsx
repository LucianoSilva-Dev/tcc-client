"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { useCitacao } from "@/../contexts/citacao-context"
import CitacaoCard from "@/../components/cita-card"
import { useRouter } from "next/navigation"

export default function CitacoesFavoritas() {
  const router = useRouter()
  const { citacoes, favoritos, pesquisar } = useCitacao()
  const [termoBusca, setTermoBusca] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Filtrar apenas os favoritos
  let citacoesFavoritas = citacoes.filter((cit) => favoritos.includes(cit.id))

  if (termoBusca) {
    const resultadosBusca = pesquisar(termoBusca)
    citacoesFavoritas = resultadosBusca.filter((cit) => favoritos.includes(cit.id))
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Suas Citações Favoritas</h1>

            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Pesquisar nos favoritos"
                  className="w-full py-3 pl-12 pr-4 bg-gray-400/50 text-gray-800 rounded-full focus:outline-none"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
              </form>
              <div className="flex justify-center space-x-4 mb-6">
              <Link
                href="/citar"
                className="flex items-center px-8 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
              >
                Explorar citações
              </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 mb-10"></div>

          {citacoesFavoritas.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                {termoBusca
                  ? "Nenhuma citação favorita encontrada para esta busca."
                  : "Você ainda não tem citações favoritas."}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citacoesFavoritas.map((citacao) => (
              <CitacaoCard key={citacao.id} citacao={citacao} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
