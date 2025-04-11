"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

export interface CitacaoData {
  autor: string
  conteudo: string
  fonte: string
}

export interface Citacao extends CitacaoData {
  id: string
  criadaEm: string
}

interface CitacaoContextType {
  citacoes: Citacao[]
  adicionarCitacao: (data: CitacaoData) => Promise<Citacao>
  toggleFavorito: (id: string) => void
  favoritos: string[]
  pesquisar: (termo: string) => Citacao[]
}

const CitacaoContext = createContext<CitacaoContextType | undefined>(undefined)

export function CitacaoProvider({ children }: { children: React.ReactNode }) {
  const [citacoes, setCitacoes] = useState<Citacao[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const storedCitacoes = localStorage.getItem("citacoes")
    const storedFavoritos = localStorage.getItem("citacoesFavoritas")

    if (storedCitacoes) {
      setCitacoes(JSON.parse(storedCitacoes))
    } else {
      // Dados iniciais de exemplo
      setCitacoes([
        {
          id: "1",
          autor: "Fernando Pessoa",
          conteudo: "A liberdade é a possibilidade do isolamento. Se te é impossível viver só, nasceste escravo.",
          fonte: "Livro do Desassossego",
          criadaEm: new Date().toISOString(),
        },
        {
          id: "2",
          autor: "Albert Einstein",
          conteudo:
            "Tudo o que é realmente grande e inspirador é criado pelo indivíduo que pode trabalhar em liberdade.",
          fonte: "Escritos",
          criadaEm: new Date().toISOString(),
        },
        {
          id: "3",
          autor: "Nelson Mandela",
          conteudo: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
          fonte: "Discurso",
          criadaEm: new Date().toISOString(),
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
      localStorage.setItem("citacoes", JSON.stringify(citacoes))
      localStorage.setItem("citacoesFavoritas", JSON.stringify(favoritos))
    }
  }, [citacoes, favoritos, isLoaded])

  // Adicionar nova citação
  const adicionarCitacao = async (data: CitacaoData): Promise<Citacao> => {
    const novaCitacao: Citacao = {
      ...data,
      id: Date.now().toString(),
      criadaEm: new Date().toISOString(),
    }

    setCitacoes((prev) => [novaCitacao, ...prev])
    return novaCitacao
  }

  // Adicionar/remover dos favoritos
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Pesquisar por termo
  const pesquisar = (termo: string): Citacao[] => {
    if (!termo.trim()) return citacoes

    const termoBusca = termo.toLowerCase().trim()
    return citacoes.filter(
      (cit) =>
        cit.conteudo.toLowerCase().includes(termoBusca) ||
        cit.autor.toLowerCase().includes(termoBusca) ||
        cit.fonte.toLowerCase().includes(termoBusca),
    )
  }

  return (
    <CitacaoContext.Provider
      value={{
        citacoes,
        adicionarCitacao,
        toggleFavorito,
        favoritos,
        pesquisar,
      }}
    >
      {children}
    </CitacaoContext.Provider>
  )
}

export function useCitacao() {
  const context = useContext(CitacaoContext)
  if (context === undefined) {
    throw new Error("useCitacao deve ser usado dentro de um CitacaoProvider")
  }
  return context
}
