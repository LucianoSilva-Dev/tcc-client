"use client"

import type React from "react"
import type { RepertorioData } from "@/../components/repertorio_form"

import { createContext, useContext, useState, useEffect } from "react"

// Estendendo o tipo RepertorioData para incluir id e data de criação
export interface Repertorio extends RepertorioData {
  id: string
  criadoEm: string
  comentarios: number
}

interface RepertorioContextType {
  repertorios: Repertorio[]
  adicionarRepertorio: (data: RepertorioData) => Promise<Repertorio>
  removerRepertorio: (id: string) => void
  atualizarRepertorio: (id: string, data: RepertorioData) => Promise<Repertorio>
  toggleFavorito: (id: string) => void
  favoritos: string[]
  filtrarPorCategoria: (categoria: string | null) => Repertorio[]
  pesquisar: (termo: string) => Repertorio[]
}

const RepertorioContext = createContext<RepertorioContextType | undefined>(undefined)

export function RepertorioProvider({ children }: { children: React.ReactNode }) {
  const [repertorios, setRepertorios] = useState<Repertorio[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const storedRepertorios = localStorage.getItem("repertorios")
    const storedFavoritos = localStorage.getItem("favoritos")

    if (storedRepertorios) {
      setRepertorios(JSON.parse(storedRepertorios))
    } else {
      // Dados iniciais de exemplo
      setRepertorios([
        {
          id: "1",
          titulo: "Desigualdade Social no Brasil",
          conteudo:
            "A desigualdade social no Brasil tem raízes históricas que remontam ao período colonial. Segundo dados do IBGE, o país possui um dos maiores índices de concentração de renda do mundo, com os 10% mais ricos detendo mais de 40% da renda nacional.",
          fonte: "IBGE, 2022",
          categoria: "Sociologia",
          tags: ["desigualdade", "brasil", "economia"],
          isPublico: true,
          criadoEm: new Date().toISOString(),
          comentarios: 3,
        },
        {
          id: "2",
          titulo: "Inteligência Artificial e Ética",
          conteudo:
            "O desenvolvimento acelerado da inteligência artificial levanta questões éticas importantes sobre privacidade, vieses algorítmicos e o futuro do trabalho. Especialistas como Stuart Russell defendem a necessidade de alinhar os objetivos da IA com valores humanos.",
          fonte: "Human Compatible, Stuart Russell, 2019",
          categoria: "Tecnologia",
          tags: ["ia", "ética", "tecnologia"],
          isPublico: true,
          criadoEm: new Date().toISOString(),
          comentarios: 5,
        },
        {
          id: "3",
          titulo: "Aquecimento Global",
          conteudo:
            "O IPCC (Painel Intergovernamental sobre Mudanças Climáticas) alerta que, sem reduções significativas nas emissões de gases de efeito estufa, o aquecimento global poderá ultrapassar 1,5°C acima dos níveis pré-industriais entre 2030 e 2052.",
          fonte: "Relatório IPCC, 2021",
          categoria: "Ciência",
          tags: ["clima", "meio ambiente", "sustentabilidade"],
          isPublico: true,
          criadoEm: new Date().toISOString(),
          comentarios: 2,
        },
      ])
    }

    if (storedFavoritos) {
      setFavoritos(JSON.parse(storedFavoritos))
    }

    setIsLoaded(true)
  }, [])

  // Salvar dados no localStorage quando houver mudanças
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("repertorios", JSON.stringify(repertorios))
      localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }
  }, [repertorios, favoritos, isLoaded])

  // Adicionar novo repertório
  const adicionarRepertorio = async (data: RepertorioData): Promise<Repertorio> => {
    const novoRepertorio: Repertorio = {
      ...data,
      id: Date.now().toString(),
      criadoEm: new Date().toISOString(),
      comentarios: 0,
    }

    setRepertorios((prev) => [novoRepertorio, ...prev])
    return novoRepertorio
  }

  // Remover repertório
  const removerRepertorio = (id: string) => {
    setRepertorios((prev) => prev.filter((rep) => rep.id !== id))
    setFavoritos((prev) => prev.filter((favId) => favId !== id))
  }

  // Atualizar repertório existente
  const atualizarRepertorio = async (id: string, data: RepertorioData): Promise<Repertorio> => {
    const repertorioAtualizado = {
      ...data,
      id,
      criadoEm: repertorios.find((r) => r.id === id)?.criadoEm || new Date().toISOString(),
      comentarios: repertorios.find((r) => r.id === id)?.comentarios || 0,
    }

    setRepertorios((prev) => prev.map((rep) => (rep.id === id ? repertorioAtualizado : rep)))

    return repertorioAtualizado
  }

  // Adicionar/remover dos favoritos
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Filtrar por categoria
  const filtrarPorCategoria = (categoria: string | null): Repertorio[] => {
    if (!categoria) return repertorios
    return repertorios.filter((rep) => rep.categoria === categoria)
  }

  // Pesquisar por termo
  const pesquisar = (termo: string): Repertorio[] => {
    if (!termo.trim()) return repertorios

    const termoBusca = termo.toLowerCase().trim()
    return repertorios.filter(
      (rep) =>
        rep.titulo.toLowerCase().includes(termoBusca) ||
        rep.conteudo.toLowerCase().includes(termoBusca) ||
        rep.fonte.toLowerCase().includes(termoBusca) ||
        rep.tags.some((tag) => tag.toLowerCase().includes(termoBusca)),
    )
  }

  return (
    <RepertorioContext.Provider
      value={{
        repertorios,
        adicionarRepertorio,
        removerRepertorio,
        atualizarRepertorio,
        toggleFavorito,
        favoritos,
        filtrarPorCategoria,
        pesquisar,
      }}
    >
      {children}
    </RepertorioContext.Provider>
  )
}

export function useRepertorio() {
  const context = useContext(RepertorioContext)
  if (context === undefined) {
    throw new Error("useRepertorio deve ser usado dentro de um RepertorioProvider")
  }
  return context
}
