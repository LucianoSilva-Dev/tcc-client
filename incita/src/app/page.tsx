"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import { useRepertorio } from "@/../contexts/repertorio-context"
import RepertorioCard from "@/../components/repertorio-card"
import { useRouter } from "next/navigation"

const categorias = [
  "Todos",
  "Filosofia",
  "Sociologia",
  "História",
  "Literatura",
  "Ciência",
  "Tecnologia",
  "Atualidades",
  "Outro",
]

export default function Home() {
  const router = useRouter()
  const { repertorios, pesquisar, filtrarPorCategoria } = useRepertorio()
  const [termoBusca, setTermoBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // A busca já acontece em tempo real, mas podemos adicionar lógica adicional aqui se necessário
  }

  const handleEditRepertorio = (id: string) => {
    router.push(`/editar/${id}`)
  }

  // Aplicar filtros
  let repertoriosFiltrados = categoriaAtiva
    ? filtrarPorCategoria(categoriaAtiva === "Todos" ? null : categoriaAtiva)
    : repertorios

  if (termoBusca) {
    repertoriosFiltrados = pesquisar(termoBusca)
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <div className="flex-1 bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Título e pesquisa */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Pronto para turbinar
              <br />
              suas redações?
            </h1>

            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Pesquise por um repertório"
                  className="w-full py-3 pl-12 pr-4 bg-gray-400/50 text-gray-800 rounded-full focus:outline-none"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
              </form>

              <div className="flex justify-center space-x-4 mb-6">
                <Link
                  href="/add_repertorio"
                  className="flex items-center px-8 py-2 bg-teal-700 text-white rounded-full hover:bg-teal-800 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Adicionar
                </Link>
              </div>

              {/* Filtro de categorias */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => setCategoriaAtiva(categoria === "Todos" ? null : categoria)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      (categoria === "Todos" && categoriaAtiva === null) || categoria === categoriaAtiva
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-300 mb-10"></div>

          {/* Mensagem quando não há resultados */}
          {repertoriosFiltrados.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Nenhum repertório encontrado.</p>
              <Link
                href="/adicionar"
                className="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Adicionar novo repertório
              </Link>
            </div>
          )}

          {/* Cards de repertório */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repertoriosFiltrados.map((repertorio) => (
              <RepertorioCard key={repertorio.id} repertorio={repertorio} onEdit={handleEditRepertorio} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
