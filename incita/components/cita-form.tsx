"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import type { CitacaoData } from "@/../contexts/citacao-context"
import axios, { AxiosRequestConfig } from 'axios'
import { handleAxiosError } from "@/../src/app/utils"
import { API_BASE_URL } from "@/app/constants"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type CitacaoFormProps = {
  onSubmit: (data: CitacaoData) => Promise<void>
  onCancel: () => void
}

export default function CitacaoForm({ onSubmit, onCancel }: CitacaoFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CitacaoData>({
    author: "",
    content: "",
    font: "",
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

    if (!formData.author.trim()) {
      newErrors.author = "O autor é obrigatório"
    }

    if (!formData.content.trim()) {
      newErrors.content = "O conteúdo da citação é obrigatório"
    }

    if (!formData.font.trim()) {
      newErrors.font = "A fonte é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)
      const { author, content, font } = formData
      // TODO: Verificar se o token do usuario está realmente presente no localStorage antes de fazer a requisição.
      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      }
      const response = await axios.post(`${API_BASE_URL}/background`, { author, content, font }, headers)
      toast.success(response.data.message as string)
      router.push("/citar")
    } catch (e) {
      console.log(e)
      handleAxiosError(e)
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
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.author ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite o autor da citação"
            />
            {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo
            </label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className={`w-full px-3 py-2 border ${errors.content ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite o conteúdo da citação"
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="fonte" className="block text-sm font-medium text-gray-700 mb-1">
              Fonte
            </label>
            <input
              type="text"
              id="fonte"
              name="fonte"
              value={formData.font}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.font ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              placeholder="Digite a fonte da citação"
            />
            {errors.font && <p className="mt-1 text-sm text-red-500">{errors.font}</p>}
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
