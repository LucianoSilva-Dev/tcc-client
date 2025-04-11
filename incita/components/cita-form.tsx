"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import type { CitacaoData } from "@/../contexts/citacao-context"

type CitacaoFormProps = {
  onSubmit: (data: CitacaoData) => Promise<void>
  onCancel: () => void
}

export default function CitacaoForm({ onSubmit, onCancel }: CitacaoFormProps) {
  const [formData, setFormData] = useState<CitacaoData>({
    autor: "",
    conteudo: "",
    fonte: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro quando o campo é editado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.autor.trim()) {
      newErrors.autor = "O autor é obrigatório"
    }

    if (!formData.conteudo.trim()) {
      newErrors.conteudo = "O conteúdo da citação é obrigatório"
    }

    if (!formData.fonte.trim()) {
      newErrors.fonte = "A fonte é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Erro ao salvar citação:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xl mx-auto">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-xl font-semibold">Adicionar Nova Citação</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="autor" className="block text-sm font-medium text-gray-700 mb-1">
              Autor
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.autor ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite o autor da citação"
            />
            {errors.autor && <p className="mt-1 text-sm text-red-500">{errors.autor}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo
            </label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={formData.conteudo}
              onChange={handleChange}
              rows={5}
              className={`w-full px-3 py-2 border ${
                errors.conteudo ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite o conteúdo da citação"
            />
            {errors.conteudo && <p className="mt-1 text-sm text-red-500">{errors.conteudo}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="fonte" className="block text-sm font-medium text-gray-700 mb-1">
              Fonte
            </label>
            <input
              type="text"
              id="fonte"
              name="fonte"
              value={formData.fonte}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.fonte ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite a fonte da citação"
            />
            {errors.fonte && <p className="mt-1 text-sm text-red-500">{errors.fonte}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X size={18} className="mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 disabled:opacity-50"
            >
              {isSubmitting ? "Salvando..." : "Salvar Citação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
