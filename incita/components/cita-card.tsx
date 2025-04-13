"use client"
import { Star } from "lucide-react"
import { useCitacao } from "@/../contexts/citacao-context"
import type { Citacao } from "@/../contexts/citacao-context"

interface CitacaoCardProps {
  citacao: Citacao
}

export default function CitacaoCard({ citacao }: CitacaoCardProps) {
  const { toggleFavorito, favoritos } = useCitacao()
  const isFavorito = favoritos.includes(citacao.id)

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Conteúdo da citação */}
      <div className="p-4">
        <p className="text-gray-800 italic mb-3">"{citacao.content}"</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">{citacao.author}</p>
            <p className="text-sm text-gray-600">{citacao.font}</p>
          </div>
          <button
            onClick={() => toggleFavorito(citacao.id)}
            className={`transition-colors ${isFavorito ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Star size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
