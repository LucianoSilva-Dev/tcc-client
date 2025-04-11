"use client"

import { useState } from "react"
import { Star, MessageCircle, User, Trash, Edit } from "lucide-react"
import { useRepertorio } from "@/../contexts/repertorio-context"
import type { Repertorio } from "@/../contexts/repertorio-context"

interface RepertorioCardProps {
  repertorio: Repertorio
  onEdit?: (id: string) => void
}

export default function RepertorioCard({ repertorio, onEdit }: RepertorioCardProps) {
  const { toggleFavorito, favoritos, removerRepertorio } = useRepertorio()
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const isFavorito = favoritos.includes(repertorio.id)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const handleDelete = () => {
    if (showConfirmDelete) {
      removerRepertorio(repertorio.id)
      setShowConfirmDelete(false)
    } else {
      setShowConfirmDelete(true)
    }
  }

  return (
    <div className="bg-gray-600 rounded-lg overflow-hidden text-white p-4">
      {/* Cabeçalho do card */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <User size={18} className="text-gray-600" />
          </div>
          <div className="ml-2 flex flex-col">
            <span>{repertorio.isPublico ? "Público" : "Privado"}</span>
            <span className="text-xs text-gray-300">{formatDate(repertorio.criadoEm)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleFavorito(repertorio.id)}
            className={`transition-colors ${
              isFavorito ? "text-yellow-400 hover:text-yellow-300" : "text-gray-300 hover:text-white"
            }`}
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Star size={20} />
          </button>
        </div>
      </div>

      {/* Categoria */}
      {repertorio.categoria && (
        <div className="mb-2">
          <span className="inline-block text-xs bg-teal-600 px-2 py-0.5 rounded-full">{repertorio.categoria}</span>
        </div>
      )}

      {/* Título */}
      <div className="bg-gray-500/50 rounded p-2 mb-3 text-center font-medium">{repertorio.titulo}</div>

      {/* Conteúdo */}
      <div className="bg-gray-500/30 rounded p-3 mb-3 h-32 overflow-y-auto">
        <p className="whitespace-pre-line text-sm">{repertorio.conteudo}</p>
      </div>

      {/* Fonte */}
      <div className="bg-gray-500/50 rounded p-2 mb-3 text-center text-sm">{repertorio.fonte}</div>

      {/* Tags */}
      {repertorio.tags && repertorio.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {repertorio.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comentários */}
      <div className="flex items-center justify-center">
        <MessageCircle size={18} />
        <span className="ml-2">{repertorio.comentarios} Comentários</span>
      </div>

      {/* Confirmação de exclusão */}
      {showConfirmDelete && (
        <div className="mt-3 p-2 bg-red-900/50 rounded-md text-center">
          <p className="text-sm mb-2">Tem certeza que deseja excluir?</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-xs"
            >
              Cancelar
            </button>
            <button
              onClick={() => removerRepertorio(repertorio.id)}
              className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded-md text-xs"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
