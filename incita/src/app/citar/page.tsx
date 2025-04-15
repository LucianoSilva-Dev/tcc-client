"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import { useCitacao } from "@/../contexts/citacao-context"
import CitacaoCard from "@/../components/cita-card"

export default function Citacoes() {
  const { citacoes, pesquisar, getCitations} = useCitacao()
  const [termoBusca, setTermoBusca] = useState("")

  // carrega as citações toda vez que a pagina é carregada
  useEffect(() => {
    getCitations()
    }, []
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Aplicar filtros
  let citacoesFiltradas = citacoes

  if (termoBusca) {
    citacoesFiltradas = pesquisar(termoBusca)
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <div className="flex-1 bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Título e pesquisa */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Citações para
              <br />
              enriquecer suas redações
            </h1>

            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Pesquise por uma citação"
                  className="w-full py-3 pl-12 pr-4 bg-gray-400/50 text-gray-800 rounded-full focus:outline-none"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
              </form>

              <div className="flex justify-center space-x-4 mb-6">
                <Link
                  href="/citar/adicionar"
                  className="flex items-center px-8 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Adicionar Citação
                </Link>
                <Link
                  href="/citar/favoritos"
                  className="flex items-center px-8 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
                >
                  Citações Favoritas
                </Link>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-300 mb-10"></div>

          {/* Mensagem quando não há resultados */}
          {citacoesFiltradas.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Nenhuma citação encontrada.</p>
              <Link
                href="/citar/adicionar"
                className="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Adicionar nova citação
              </Link>
            </div>
          )}

          {/* Cards de citação */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citacoesFiltradas.map((citacao) => (
              <CitacaoCard key={citacao.id} citacao={citacao} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
