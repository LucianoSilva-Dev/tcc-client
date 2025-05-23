"use client"

import { useState } from "react"
import { ThumbsUp, User, Trash, Edit, Bookmark } from "lucide-react"
import { useRepertorio } from "@/../contexts/repertorio-context"
import type { Repertorio } from "@/../contexts/repertorio-context"

interface RepertorioCardProps {
  repertorio: Repertorio
  onEdit?: (id: string) => void
}

export default function RepertorioCard({ repertorio, onEdit }: RepertorioCardProps) {
  const { toggleFavorito, favoritos } = useRepertorio()
  const [likes, setLikes] = useState(200) // Simulando likes
  const [isLiked, setIsLiked] = useState(false)
  const isFavorito = favoritos.includes(repertorio.id)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const getCategoryColor = (categoria: string) => {
    const colors = {
      Filosofia: "bg-blue-100 text-blue-800 border-blue-200",
      Sociologia: "bg-green-100 text-green-800 border-green-200",
      História: "bg-purple-100 text-purple-800 border-purple-200",
      Literatura: "bg-orange-100 text-orange-800 border-orange-200",
      Ciência: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Tecnologia: "bg-gray-100 text-gray-800 border-gray-200",
      Atualidades: "bg-red-100 text-red-800 border-red-200",
      Outro: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    return colors[categoria as keyof typeof colors] || colors["Outro"]
  }

  const getCardBorderColor = (categoria: string) => {
    const colors = {
      Filosofia: "border-l-blue-400",
      Sociologia: "border-l-green-400",
      História: "border-l-purple-400",
      Literatura: "border-l-orange-400",
      Ciência: "border-l-cyan-400",
      Tecnologia: "border-l-gray-400",
      Atualidades: "border-l-red-400",
      Outro: "border-l-yellow-400",
    }
    return colors[categoria as keyof typeof colors] || colors["Outro"]
  }

  return (
    <div
      className={`bg-white rounded-lg border-l-4 ${getCardBorderColor(repertorio.categoria)} shadow-sm hover:shadow-md transition-shadow p-4 relative`}
    >
      
      {/* Cabeçalho do card */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-800">Nome</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleFavorito(repertorio.id)}
            className={`transition-colors ${isFavorito ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`}
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Bookmark size={16} />
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-colors ${
              isLiked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
            }`}
            title="Curtir"
          >
            <ThumbsUp size={16} />
            <span className="text-sm">{likes}</span>
          </button>
        </div>
      </div>

      {/* Tag da categoria */}
      <div className="mb-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(repertorio.categoria)}`}
        >
          #{repertorio.categoria}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.titulo}</h3>

      {/* Subtítulo/Autor (se disponível) */}
      <p className="text-sm text-gray-600 mb-3">Por {repertorio.fonte}</p>

      {/* Conteúdo */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-4">
          {repertorio.conteudo.length > 200 ? `${repertorio.conteudo.substring(0, 200)}...` : repertorio.conteudo}
        </p>
      </div>

      {/* Fonte */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Fonte:</span> "{repertorio.fonte}"
        </p>
      </div>

      {/* Footer com tópicos */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex space-x-4">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Tópico</button>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Subtópico</button>
        </div>
      </div>

    </div>
  )
}
