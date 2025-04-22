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
    <div className="bg-white border border-gray-400 rounded-lg shadow-lg overflow-hidden">
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
            className="cursor-pointer transition-colors"
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Star size={20} className={`${isFavorito ? "fill-yellow-500 duration-400" : " hover:text-yellow-500 duration-400"}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
