"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Plus } from "lucide-react"
import Link from "next/link"
import { useRepertorio } from "@/../contexts/repertorio-context"
import RepertorioCard from "../../../components/repertorio/repertorio-card"
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
  const { repertorios, pesquisar, filtrarPorCategoria, favoritos } = useRepertorio()
  const [termoBusca, setTermoBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null)
  const [tipoVisualizacao, setTipoVisualizacao] = useState<"todos" | "salvos">("todos")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleEditRepertorio = (id: string) => {
    router.push(`/editar/${id}`)
  }

  // Aplicar filtros
  let repertoriosFiltrados = categoriaAtiva
    ? filtrarPorCategoria(categoriaAtiva === "Todos" ? null : categoriaAtiva)
    : repertorios

  // Filtrar por tipo (todos ou salvos)
  if (tipoVisualizacao === "salvos") {
    repertoriosFiltrados = repertoriosFiltrados.filter((rep) => favoritos.includes(rep.id))
  }

  if (termoBusca) {
    repertoriosFiltrados = pesquisar(termoBusca)
    if (tipoVisualizacao === "salvos") {
      repertoriosFiltrados = repertoriosFiltrados.filter((rep) => favoritos.includes(rep.id))
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Pronto para turbinar
            <br />
            suas redações?
          </h1>

          {/* Botões de alternância */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setTipoVisualizacao("salvos")}
              className={`px-6 py-3 rounded-full border-2 transition-colors ${
                tipoVisualizacao === "salvos"
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
              }`}
            >
              Repertórios salvos
            </button>
            <button
              onClick={() => setTipoVisualizacao("todos")}
              className={`px-6 py-3 rounded-full border-2 transition-colors ${
                tipoVisualizacao === "todos"
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
              }`}
            >
              Repertórios
            </button>
          </div>

          {/* Barra de pesquisa */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm">
                <div className="pl-4">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Pesquise por palavra-chave, título, autor ou obra"
                  className="flex-1 py-4 px-4 bg-transparent focus:outline-none text-gray-700"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="pr-4 text-gray-400 hover:text-gray-600"
                >
                  <Filter size={20} />
                </button>
              </div>
            </form>

            {/* Filtros expandidos */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-wrap justify-center gap-2">
                  {categorias.map((categoria) => (
                    <button
                      key={categoria}
                      onClick={() => setCategoriaAtiva(categoria === "Todos" ? null : categoria)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        (categoria === "Todos" && categoriaAtiva === null) || categoria === categoriaAtiva
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {categoria}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seção de repertórios */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {tipoVisualizacao === "salvos" ? "Repertórios salvos" : "Repertórios disponíveis"}
            </h2>
          </div>

          {/* Mensagem quando não há resultados */}
          {repertoriosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <p className="text-gray-500 mb-4">
                  {tipoVisualizacao === "salvos"
                    ? "Você ainda não tem repertórios salvos."
                    : "Nenhum repertório encontrado."}
                </p>
                <Link
                  href="/adicionar"
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Adicionar novo repertório
                </Link>
              </div>
            </div>
          )}

          {/* Grid de cards */}
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
